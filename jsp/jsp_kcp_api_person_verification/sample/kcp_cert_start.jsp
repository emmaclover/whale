<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file = "../cfg/site_conf_inc.jsp"%>
<%!
    public String f_get_parm( String val )
    {
        if ( val == null ) val = "";
        return  val;
    }
%>

<%
    String site_cd              = g_conf_site_cd;                                    // 사이트코드
    String ordr_idxx            = f_get_parm( request.getParameter( "ordr_idxx"  )); // up_hash 생성시 전달 된 주문번호
    String up_hash              = f_get_parm( request.getParameter( "up_hash"  ));
    String web_siteid           = g_conf_web_siteid;                                 
    String kcp_merchant_time    = f_get_parm( request.getParameter( "kcp_merchant_time"  ));
    String kcp_cert_lib_ver     = f_get_parm( request.getParameter( "kcp_cert_lib_ver"  ));  
    String web_siteid_hashYN    = g_conf_web_siteid_hashYN;                          
%> 

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>*** NHN KCP API SAMPLE ***</title>
<meta http-equiv="x-ua-compatible" content="ie=edge"/>
<meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, target-densitydpi=medium-dpi" >
<link href="../static/css/style.css" rel="stylesheet" type="text/css" id="cssLink"/> 
<script type="text/javascript">

// 인증창 호출 함수
function auth_type_check()
{
	var auth_form = document.form_auth;
	
	if (auth_form.kcp_page_submit_yn.value != "Y")
	{
	    var return_gubun;
	    var width  = 410;
	    var height = 500;

	    var leftpos = screen.width  / 2 - ( width  / 2 );
	    var toppos  = screen.height / 2 - ( height / 2 );

	    var winopts  = "width=" + width   + ", height=" + height + ", toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no";
	    var position = ",left=" + leftpos + ", top="    + toppos;
	    var AUTH_POP = window.open('','auth_popup', winopts + position);
	    
	    auth_form.target = "auth_popup";
	}
    
    auth_form.action = "./kcp_cert_req.jsp"; // 인증창 호출 및 결과값 리턴 페이지 주소
    
    return true;
}

</script>
    </head>
    <body oncontextmenu="return false;" ondragstart="return false;" onselectstart="return false;">
    <div id="cert_info">
    <form name="form_auth" method="post">
    <div class="wrap">
	<div class="header">
            <a href="./make_hash.html" class="btn-back"><span>뒤로가기</span></a>
             <h1 class="title">본인인증 SAMPLE</h1>
            </div>
            <!-- //header -->
            <!-- contents -->
            <div id="skipCont" class="contents">
                <p class="txt-type-1">이 페이지는 본인인증을 요청하는 샘플 페이지입니다.</p>
                <!-- 거래등록 -->
                <h2 class="title-type-3">본인인증</h2>
                <ul class="list-type-1">
                    <!-- 주문번호(ordr_idxx) -->
                    <li>
                        <div class="left"><p class="title">주문번호</p></div>
                        <div class="right">
                            <div class="ipt-type-1 pc-wd-2">
                                <input type="text" name="ordr_idxx" value="<%=ordr_idxx %>" maxlength="40" />
                            </div>
                        </div>
                    </li>
                    <!-- up_hash -->
                    <li>
                        <div class="left"><p class="title">up_hash</p></div>
                        <div class="right">
                            <div class="ipt-type-1 pc-wd-2">
                                <input type="text" name="up_hash" value="<%=up_hash %>" />
                            </div>
                        </div>
                    </li>
                </ul>
                <div Class="Line-Type-1"></div>
                <ul class="list-btn-2">
                	<li><input type="submit" onclick="return auth_type_check();" class="btn-type-2 pc-wd-3" value="인증요청"></li>
                    <li class="pc-only-show"><a href="./make_hash.html" class="btn-type-3 pc-wd-2">뒤로</a></li>
                </ul>
            </div>
           </div>	
            <!-- //contents -->

            <!-- footer -->
            <div class="grid-footer">
                <div class="inner">
                    <div class="footer">
                        ⓒ NHN KCP Corp.
                    </div>
                </div>
            </div>
            <!-- 요청종류 -->
            <input type="hidden" name="req_tx"       value="cert"/>
            <!-- 요청구분 -->
            <input type="hidden" name="cert_method"  value="01"/>
            <input type="hidden" name="web_siteid"   value="<%= web_siteid %>"/> 
            <input type="hidden" name="site_cd"      value="<%= site_cd %>" />               
            <input type="hidden" name="Ret_URL"      value="<%= g_conf_Ret_URL %>" />
            <!-- cert_otp_use 필수 ( 메뉴얼 참고)
            Y : 실명 확인 + OTP 점유 확인 -->
            <input type="hidden" name="cert_otp_use" value="Y"/>
            <!-- 리턴 암호화 고도화 -->
            <input type="hidden" name="cert_enc_use_ext" value="Y"/>
            <input type="hidden" name="res_cd"       value=""/>
            <input type="hidden" name="res_msg"      value=""/>
            <!-- web_siteid 검증 을 위한 필드 -->
            <input type="hidden" name="web_siteid_hashYN" value="<%= web_siteid_hashYN %>"/> 
          
            <input type="hidden" name="kcp_merchant_time"  value="<%= kcp_merchant_time %>"/> 
            <input type="hidden" name="kcp_cert_lib_ver"  value="<%= kcp_cert_lib_ver %>"/>
            
            <!-- 가맹점 사용 필드 (인증완료시 리턴)-->
            <input type="hidden" name="param_opt_1"  value="opt1"/> 
            <input type="hidden" name="param_opt_2"  value="opt2"/> 
            <input type="hidden" name="param_opt_3"  value="opt3"/>  
            
            <!-- 페이지 전환 방식 사용여부-->
            <input type="hidden" name="kcp_page_submit_yn"  value=""/>
            </form>
            </div>
    </body>
</html>