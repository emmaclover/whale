<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Enumeration" %>
<%@ page import="java.net.URLDecoder" %>
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
<%@ include file = "../cfg/site_conf_inc.jsp"%>
<%!
    /* 
	==============================================================================
     null 값을 처리하는 메소드                                                    
    ------------------------------------------------------------------------------
	*/
	
    public String f_get_parm( String val )
    {
        if ( val == null ) val = "";
        return  val;
    }

 
    /* 
	=========================================================================
      서명데이터 생성 관련 메소드 (결제 취소시 필요)                                                               
    -------------------------------------------------------------------------
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
    request.setCharacterEncoding ( "euc-kr" ) ;

    String req_tx          = ""; 
    String site_cd         = "";
    String ordr_idxx       = "";
    String cert_no         = "";
    String enc_cert_data2  = "";
    String res_cd          = "";
    String res_msg     	   = ""; 
    String dn_hash    	   = "";

    StringBuffer sbParam = new StringBuffer();
    
    // request 로 넘어온 값 처리
    Enumeration params = request.getParameterNames();
    while(params.hasMoreElements())
    {
         String nmParam = (String) params.nextElement();
         String valParam[] = request.getParameterValues(nmParam);

        for(int i = 0; i < valParam.length;i++)
        {
            if( nmParam.equals( "site_cd" ) )
            {
                site_cd = f_get_parm( valParam[i] );
            }

            if( nmParam.equals( "ordr_idxx" ) )
            {
            	ordr_idxx = f_get_parm( valParam[i] );
            }
            
            if( nmParam.equals( "cert_no" ) )
            {
            	cert_no = f_get_parm( valParam[i] );
            }

            if( nmParam.equals( "res_cd" ) )
            {
            	res_cd = f_get_parm( valParam[i] );
            }

            if( nmParam.equals( "enc_cert_data2" ) )
            {
            	enc_cert_data2 = f_get_parm( valParam[i] );
            }

            if( nmParam.equals( "dn_hash" ) )
            {
            	dn_hash = f_get_parm( valParam[i] );
            }
            
            sbParam.append( "<input type=\"hidden\" name=\"" + nmParam + "\" value=\"" + f_get_parm( valParam[i] ) + "\"/>" );
        }
    }

    if( res_cd.equals( "0000" ) )
    {
        /* 
        ==========================================================================
             dn_hash 검증                                                               
        --------------------------------------------------------------------------
        */
        String dnhash_data = site_cd + "^" + "CHK" + "^" + cert_no + "^" + dn_hash;
        String kcp_sign_data = makeSignatureData(dnhash_data);

        JSONObject json_req = new JSONObject();

        json_req.put("kcp_cert_info", g_conf_cert_info);
        json_req.put("site_cd", site_cd);
        json_req.put("ordr_idxx", ordr_idxx); // dn_hash 검증 요청 전 가맹점 DB상의 주문번호와 동일한지 검증 후 요청 바랍니다.
        json_req.put("cert_no", cert_no);
        json_req.put("dn_hash", dn_hash);
        json_req.put("ct_type", "CHK");
        json_req.put("kcp_sign_data", kcp_sign_data);

        String chk_temp_req_data = json_req.toString();
        String chk_data = chk_temp_req_data.replace(",",",\r\n");

        String chk_inputLine = null;
        StringBuffer chk_outResult = new StringBuffer();

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
            os.write(chk_data.getBytes("UTF-8"));
            os.flush();
            
            // API RES
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            while ((chk_inputLine = in.readLine()) != null) 
            {
                chk_outResult.append(chk_inputLine);
            }
            conn.disconnect();
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }

        String chk_temp_result = chk_outResult.toString();
        
        String dn_res_cd         = "";
        String dn_res_msg        = "";
        
        // RES JSON DATA Parsing
        JSONParser chk_parser = new JSONParser();
        JSONObject chk_json_res = (JSONObject)chk_parser.parse(chk_temp_result);
        
        dn_res_cd  = f_get_parm((String)chk_json_res.get("res_cd"));
        dn_res_msg = f_get_parm((String)chk_json_res.get("res_msg"));
        
        if(dn_res_cd.equals("0000"))
        {
			/* 
			==========================================================================
				인증데이터 복호화                                                               
			--------------------------------------------------------------------------
			*/
		
        	String decrypt_data = site_cd + "^" + "DEC" + "^" + cert_no;
            String decrypt_sign_data = makeSignatureData(decrypt_data);

            json_req.put("kcp_cert_info", g_conf_cert_info);
            json_req.put("site_cd", site_cd);
            json_req.put("ordr_idxx", ordr_idxx);
            json_req.put("cert_no", cert_no);
            json_req.put("ct_type", "DEC");
            json_req.put("enc_cert_Data", enc_cert_data2);
            json_req.put("kcp_sign_data", decrypt_sign_data);

            String dec_temp_req_data = json_req.toString();
            String dec_req_data = dec_temp_req_data.replace(",",",\r\n");

            String dec_inputLine = null;
            StringBuffer dec_outResult = new StringBuffer();

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
                os.write(dec_req_data.getBytes("UTF-8"));
                os.flush();
                
                // API RES
                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
                while ((dec_inputLine = in.readLine()) != null) 
                {
                    dec_outResult.append(dec_inputLine);
                }
                conn.disconnect();
            }
            catch(Exception e)
            {
                e.printStackTrace();
            }

            String dec_temp_result = dec_outResult.toString();
            
            String dec_res_cd         = "";
            String dec_res_msg        = "";
            
            // RES JSON DATA Parsing
            JSONParser dec_parser = new JSONParser();
            JSONObject dec_json_res = (JSONObject)dec_parser.parse(dec_temp_result);
            
            dec_res_cd  = f_get_parm((String)dec_json_res.get("res_cd"));
            dec_res_msg = f_get_parm((String)dec_json_res.get("res_msg"));
            
            out.println("결과코드        : " + f_get_parm((String)dec_json_res.get("res_cd")) + "<br>");
            out.println("결과메세지        : " + f_get_parm((String)dec_json_res.get("res_msg"))+ "<br>");
            out.println("이동통신사 코드        : " + f_get_parm((String)dec_json_res.get("comm_id"))+ "<br>");
            out.println("전화번호        : " + f_get_parm((String)dec_json_res.get("phone_no"))+ "<br>");
            out.println("이름        : " + f_get_parm((String)dec_json_res.get("user_name"))+ "<br>");
            out.println("생년월일        : " + f_get_parm((String)dec_json_res.get("birth_day"))+ "<br>");
            out.println("성별코드        : " + f_get_parm((String)dec_json_res.get("sex_code"))+ "<br>");
            out.println("내/외국인 정보        : " + f_get_parm((String)dec_json_res.get("local_code"))+ "<br>");
            out.println("CI        : " + f_get_parm((String)dec_json_res.get("ci"))+ "<br>");
            out.println("DI        : " + f_get_parm((String)dec_json_res.get("di"))+ "<br>");
            out.println("CI_URL        : " + f_get_parm((String)dec_json_res.get("ci_url"))+ "<br>");
            out.println("DI_URL        : " + f_get_parm((String)dec_json_res.get("di_url"))+ "<br>");
        }
        else
        {
        	System.out.println("dn_hash 변조 위험있음");
        }
		
    }
    else/*if( res_cd.equals( "0000" ) != true )*/
    {
        // 인증실패
    }
    
%>