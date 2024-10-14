<%@ page language="java" contentType="text/html;charset=euc-kr"%>
<%@ page import="java.util.Enumeration" %>
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

%>
<%

    request.setCharacterEncoding ( "euc-kr" ) ;

    String req_tx         = ""; 
    String site_cd        = "";
    String ordr_idxx      = ""; 
    String web_siteid     = "";
    String web_siteid_hashYN = "";
    String up_hash        = f_get_parm(request.getParameter("up_hash"));
    String Ret_URL        = "";


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

            if( nmParam.equals( "req_tx" ) )
            {
                req_tx = f_get_parm( valParam[i] );
            }
            
            if( nmParam.equals( "ordr_idxx" ) )
            {
                ordr_idxx = f_get_parm( valParam[i] );
            }
         	// 인증창으로 넘기는 form 데이터 생성 필드
            sbParam.append( "<input type=\"hidden\" name=\"" + nmParam + "\" value=\"" + f_get_parm( valParam[i] ) + "\"/>" );
        }
    }
    
    	sbParam.append( "<input type=\"hidden\" name=\"" + up_hash + "\" value=\"" + up_hash + "\"/>" );
    
    if( web_siteid_hashYN.equals( "Y" ) )
    {
    	sbParam.append( "<input type=\"hidden\" name=\"" + web_siteid_hashYN + "\" value=\"" + f_get_parm( web_siteid_hashYN ) + "\"/>" );
    	sbParam.append( "<input type=\"hidden\" name=\"" + web_siteid + "\" value=\"" + f_get_parm( web_siteid ) + "\"/>" );
    }
    
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
        <link href="../static/css/style.css" rel="stylesheet" type="text/css" id="cssLink"/>    
        <title>*** NHN KCP Online Payment System [Jsp Version] ***</title>
        <script type="text/javascript">
            window.onload=function()
            {
                cert_page();
            }

			// 인증 요청 시 호출 함수
            function cert_page()
            {
                var frm = document.form_auth;

				if ( ( frm.req_tx.value == "auth" || frm.req_tx.value == "otp_auth" ) )
                {
                    frm.action="./kcp_cert_res.jsp";

                    frm.submit();

                }
				
				else if ( frm.req_tx.value == "cert" )
                {
                    frm.action="https://testcert.kcp.co.kr/kcp_cert/cert_view.jsp"; // 개발계
                    //frm.action="https://cert.kcp.co.kr/kcp_cert/cert_view.jsp"; // 운영계
                    frm.submit();
                }
			}

        </script>
    </head>
    <body oncontextmenu="return false;" ondragstart="return false;" onselectstart="return false;">
        <form name="form_auth" method="post">
		<%= sbParam.toString() %>
        </form>
    </body>
</html>
