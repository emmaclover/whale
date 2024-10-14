<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="org.json.simple.parser.JSONParser" %>
<%@ page import="org.json.simple.parser.ParseException" %>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.net.HttpURLConnection" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.security.PrivateKey" %>
<%@ page import="java.nio.charset.StandardCharsets" %>
<%@ page import="java.security.Signature" %>
<%@ page import="java.security.SignatureException" %>
<%@ page import="java.security.NoSuchAlgorithmException" %>
<%@ page import="java.security.InvalidKeyException" %>
<%@ page import="java.nio.file.Files" %>
<%@ page import="java.nio.file.Path" %>
<%@ page import="java.nio.file.Paths" %>
<%@ page import="java.util.stream.Collectors" %>
<%@ page import="org.bouncycastle.asn1.ASN1Sequence" %>
<%@ page import="org.bouncycastle.asn1.pkcs.PrivateKeyInfo" %>
<%@ page import="org.bouncycastle.pkcs.PKCS8EncryptedPrivateKeyInfo" %>
<%@ page import="org.bouncycastle.pkcs.PKCSException" %>
<%@ page import="org.bouncycastle.openssl.jcajce.JcaPEMKeyConverter" %>
<%@ page import="org.bouncycastle.openssl.jcajce.JceOpenSSLPKCS8DecryptorProviderBuilder" %>
<%@ page import="org.bouncycastle.operator.InputDecryptorProvider" %>
<%@ page import="org.bouncycastle.operator.OperatorCreationException" %>
<%@ include file = "cfg/site_conf_inc.jsp"%>
<%!
    /* 
    ==========================================================================
    null 값을 처리하는 메소드                                                               
    --------------------------------------------------------------------------
    */
    public String f_get_parm( String val )
    {
        if ( val == null ) val = "";
        return  val;
    }
    /* 
    ==========================================================================
    서명데이터 생성 관련 메소드 (결제 취소시 필요)                                                               
    --------------------------------------------------------------------------
    */  
    // 개인키 파일을 읽어 PrivateKey 객체 리턴
    public static PrivateKey loadSplMctPrivateKeyPKCS8()
    {
        PrivateKey priKey = null;
        
        // 개인키 인증서 경로 및 비밀번호(테스트용)
        String filePath = "C:/../jsp_kcp_api_person_verification_sample/certificate/splPrikeyPKCS8.pem";
        String privateKeyPassword = "changeit";
    
        try
        {
            Path path = Paths.get( filePath );
    
            /*********************************
             * PKCS#8 foramt 에서 header & footer 제거
             *********************************/
            String strPriKeyData = Files.readAllLines( path )
                    .stream()
                    .filter( line -> !line.startsWith( "-----BEGIN" ) && !line.startsWith( "-----END" ) )
                    .collect( Collectors.joining() );
    
            // Base64 decoding
            byte[] btArrPriKey   = Base64.getDecoder().decode( strPriKeyData );
    
            /*********************************
             * PEMParser 적용 항목 선언
             *********************************/
            ASN1Sequence derSeq = ASN1Sequence.getInstance( btArrPriKey );
            PKCS8EncryptedPrivateKeyInfo encPkcs8PriKeyInfo = new PKCS8EncryptedPrivateKeyInfo( org.bouncycastle.asn1.pkcs.EncryptedPrivateKeyInfo.getInstance( derSeq ) );
    
            /*********************************
             * 복호화 & Key 변환
             *********************************/
            JcaPEMKeyConverter pemKeyConverter = new JcaPEMKeyConverter();
            InputDecryptorProvider decProvider = new JceOpenSSLPKCS8DecryptorProviderBuilder().build( privateKeyPassword.toCharArray() );
    
            PrivateKeyInfo priKeyInfo          = encPkcs8PriKeyInfo.decryptPrivateKeyInfo( decProvider );
            priKey                             = pemKeyConverter.getPrivateKey( priKeyInfo );
    
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        catch (OperatorCreationException e)
        {
            e.printStackTrace();
        }
        catch (PKCSException e)
        {
            e.printStackTrace();
        }
    
        return priKey;
    }

    //Signature 데이터 생성 
    public static String makeSignatureData(String targetData)
    {
        
        String signData = null;
        PrivateKey priKey = null;
        priKey = loadSplMctPrivateKeyPKCS8();
    
        byte[] btArrTargetData = targetData.getBytes( StandardCharsets.UTF_8 );
    
        try {
            Signature sign = Signature.getInstance( "SHA256WithRSA" );
            sign.initSign( priKey );
            sign.update( btArrTargetData );
    
            byte[] btArrSignData = sign.sign();
    
            signData = Base64.getEncoder().encodeToString( btArrSignData );
    
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (SignatureException e) {
            e.printStackTrace();
        }
    
        return signData;
    }


%>

<%

    /* 
    ==========================================================================
         요청정보                                                                
    --------------------------------------------------------------------------
    */
    String ct_type              = f_get_parm( request.getParameter( "ct_type"  )); // 요청타입
    String ordr_idxx            = f_get_parm( request.getParameter( "ordr_idxx"  )); // 주문번호
    String make_req_dt          = f_get_parm( request.getParameter( "make_req_dt"  )); // 해쉬요청일시
    // 인증서정보(직렬화)
    String hash_data = g_conf_site_cd + "^" + ct_type + "^" + make_req_dt;
    String kcp_sign_data = makeSignatureData(hash_data);

    JSONObject json_req = new JSONObject();

    json_req.put("kcp_cert_info", g_conf_cert_info);
    json_req.put("site_cd", g_conf_site_cd);
    json_req.put("ordr_idxx", ordr_idxx);
    json_req.put("ct_type", ct_type);
    json_req.put("web_siteid", g_conf_web_siteid);
    json_req.put("make_req_dt",make_req_dt);
    json_req.put("kcp_sign_data",kcp_sign_data);

    String temp_req_data = json_req.toString();
    String req_data = temp_req_data.replace(",",",\r\n");

    String inputLine = null;
    StringBuffer outResult = new StringBuffer();

    try 
    {
        // API REQ
        URL url = new URL(g_conf_cert_url);
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
        conn.setDoOutput(true);
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Accept-Charset", "UTF-8");

        OutputStream os = conn.getOutputStream();
        os.write(req_data.getBytes("UTF-8"));
        os.flush();
        
        // API RES
        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        while ((inputLine = in.readLine()) != null) 
        {
            outResult.append(inputLine);
        }
        conn.disconnect();
    }
    catch(Exception e)
    {
        e.printStackTrace();
    }

    String temp_result = outResult.toString();

    
    /* 
    ==========================================================================
    응답정보                                                               
    --------------------------------------------------------------------------
    */
    // 공통
    String res_cd         = "";
    String res_msg        = "";
    String up_hash        = "";
    String kcp_merchant_time  = "";
    String kcp_cert_lib_ver = "";
    
    // RES JSON DATA Parsing
    JSONParser parser = new JSONParser();
    JSONObject json_res = (JSONObject)parser.parse(temp_result);
    
    res_cd  = f_get_parm((String)json_res.get("res_cd"));
    res_msg = f_get_parm((String)json_res.get("res_msg"));
    up_hash = f_get_parm((String)json_res.get("up_hash"));
    kcp_merchant_time = f_get_parm((String)json_res.get("kcp_merchant_time"));
    kcp_cert_lib_ver = f_get_parm((String)json_res.get("kcp_cert_lib_ver"));
    

%>
<!DOCTYPE>
<html>
<head>
    <title>*** NHN KCP API SAMPLE ***</title>
    <meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes, target-densitydpi=medium-dpi">  
    <script type="text/javascript">

    function goReq()
    {
        <%
        if ( res_cd.equals( "0000" ) )
        {
        %>
            alert("up_hash 생성 성공");

            document.form_hash.action = "./sample/kcp_cert_start.jsp";
	        
            document.form_hash.submit();
        <%
        }
        else
        {
        %>
            alert("에러 코드 : <%=res_cd%>, 에러 메세지 : <%=res_msg%>");
            location.href = "./sample/make_hash.html";
        <%
        }
        %>
    }
    </script>
</head>
<body onload="goReq();">
    <div class="wrap">
        <!--  거래등록 form : form_trade_reg -->
        <form name="form_hash" method="post">
        <input type="hidden" name="ordr_idxx" value="<%=ordr_idxx %>"/>
        <input type="hidden" name="up_hash" value="<%=up_hash %>"/>
        <input type="hidden" name="kcp_merchant_time" value="<%=kcp_merchant_time %>"/>
        <input type="hidden" name="kcp_cert_lib_ver" value="<%=kcp_cert_lib_ver %>"/>
        </form>
    </div>
<!--//wrap-->
</body>
</html>