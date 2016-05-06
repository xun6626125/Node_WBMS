/**************************************************************
 @author: xxhu
 @date: 2013-10-08
 *************************************************************/ 
(function ($){
	var xOffset = 15; // x 偏移像素
    var yOffset = 5; // y 偏移像素 
	var common ={
		trim : function(str){ //去除空格
			return str.replace(/(^\s*)|(\s*$)/g, "");
		},
		strlen : function (str){ //获取字符长度
			var Charset = jQuery.browser.msie ?document.charset : document.characterSet
			if(Charset.toLowerCase() == 'utf-8'){
				return str.replace(/[\u4e00-\u9fa5]/g, "***").length;
			} else {
				return str.replace(/[^\x00-\xff]/g, "**").length;
			}
		}
	};
	
	var ready = {
		getPath : function(){
			var js = document.scripts || L("script");
			var jsPath = js[js.length - 1].src;
			var jsAllPath=jsPath.replace(jsPath.split('/')[jsPath.split('/').length-1],'');
			if(jsAllPath.indexOf("/js/")){
				return jsAllPath.substring(0,jsAllPath.lastIndexOf("/") -2);
			}else{
				return  jsAllPath;
			}
		},
		global : function(){
			iE6 = !-[1,] && !window.XMLHttpRequest;
			times = 0; //追寻索引
		}
	};

	function _checkIput_fomartIP(ip) { 
		return (ip+256).toString(2).substring(1); //格式化输出(补零) 
	} 
	
	validator={
		valiData:"",
		dataTypes:"",
		validType:"",
		showTipCss :"",
		SohwType : '1',
		ErrorInput:'validato_input',
		Require :  /[^(^\s*)|(\s*$)]/,
	    Email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	    isIncludeBlank : "",//是否包含空格使用
	    AlarmSpecChart : /^[\u4e00-\u9fa5A-Za-z0-9\-\.]+$/,//只适用-告警配置-邮件服务器名称 - 特殊字符认证 
	    //UserAuthCount : /^[10]|[5]$/,
		Phone : /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
		Firstname : /^[0-9a-zA-Z\u4E00-\u9FA5\s\_\.\-]*$/,                                                                                   
		//Mobile : /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[0-9]\d{8}?$/,
		Mobile1 : /^[1]\d{10}$/,
		Mobile	: /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
		//Mobile : /^[0-9\-]{0,20}$/,
		telephone : /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
		Tel: /^(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
	    Call:/^(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^(1[358]\d{9})$)/,
	    Url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
	    IdCard : "this.isIdCard(value)",
	    Currency : /^\d+(\.\d+)?$/,
	    Number : /^\d+$/,
	    Zip : /^[1-9]\d{5}$/,
	    QQ : /^[1-9]\d{4,8}$/,
		IP  : 	/^(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]{1})\.(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]{1})\.(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]{1})\.(25[0-5]{1}|2[0-4]{1}[0-9]{1}|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]{1})$/,
		NetIP : /^(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]{1})\.(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]{1})\.(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]{1})\.(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{1,2}|[1-9]{1}[0-9]{1}|[0-9]{1})$/,
		//最后一位可以为0的IP地址
		IPZero  : /^(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]{1})\.(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]{1})\.(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]{1})\.(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{1,2}|[1-9]{1}[0-9]{1}|[0-9]{1})$/,
		DNSIP : /^(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]{1})\.(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]{1})\.(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]{1})\.(25[0-5]{1}|2[0-4]{1}[0-9]{1}|1[0-9]{1,2}|[1-9]{1}[0-9]{1}|[0-9]{1})$/,
		Domain :/^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/,
		Integer : /^[-\+]?\d+$/,
	    ZInteger: /^[+]?\d+$/,
	    Double : /^[-\+]?\d+(\.\d+)?$/,
	    ZDouble: /^[+]?\d+(\.\d+)?$/,
	    English : /^[A-Za-z]+$/,
	    Chinese :  /^[\u0391-\uFFE5]{2,6}$/,
	    //Username : /^1\d{10}$/,
	    Username : /^[|0-9a-zA-Z\u4E00-\u9FA5\@\_\.\-]*$/,
	    DepartName : /^[\u4e00-\u9fa5A-Za-z0-9\-\s]+$/, //不支持乱码 只支持短横线以及空格
	    RoleName : /^[\u4e00-\u9fa5A-Za-z0-9\-\s]+$/, //不支持乱码 只支持短横线
	    TemplateName : /^[\u4e00-\u9fa5A-Za-z0-9\-\s]+$/, //不支持乱码 只支持短横线以及空格
	    AccessPolicyName : /^[\u4e00-\u9fa5A-Za-z0-9\-\.]+$/, //不支持乱码 只支持短横线
	    ExtDeviceName : /^[\u4e00-\u9fa5A-Za-z0-9]+$/,
	    MD5  : /^[A-Za-z0-9]{32}$/,
	    ProcessName  : /^[^\/\\:\*\?\"\<\>\|]{1,46}\.exe$/i,
	    PackageUrl  : /^(http|https):\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*.(exe|msi)$/i,
	    FileUrl  : /^(http|https):\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*.([A-Za-z0-9]*)$/i,
	    //UnSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
	    UnSafe : /^.{6,100}$/,
	    RegFail : /^[0-9]*$/,
	    Registry : /^[^\u4E00-\u9FA5]*$/,
	    MAC : /[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}/,
	    Hour : /^(2[0-3]|[0-1]?\d)$/,
	    Min : /^[0-5]?\d$/,
	    IsSafe : function(str){
	    	return this.UnSafe.test(str);
	    },
	    SafeString : "this.IsSafe(value)",
	    Filter : "this.doFilter(value)",
	    Limit : "this.checkLimit(common.strlen(value))",
	    LimitB : "this.checkLimit(this.LenB(value))",
	    Date : "this.isDate(value)",
	    Repeat : "this.checkRepeat(value)",
	    Range : "this.checkRange(value)",
	    Compare : "this.checkCompare(value)",
	    Custom : "this.Exec(value)",
	    Group : "this.mustChecked()",
	    Select: "this.selectChecked(value)",
		Ajax: "this.doajax(errindex)",
		Mask : "this.isMask(value)", //子网掩码
		FileCharacter  : "this.isFileCharacter(value)",//任意位置
		isFileCharacter : function(str){
	    	var isHave = true
	    	var character=['|', '/', '"', '<', '>'];
	        for (var i = 0; i < character.length; i++) {
	            if (str.indexOf(character[i]) >= 0) {
	                isHave = false;
	                break;
	            }
	        }
	        return isHave;
    	},
    	MobileDisk  : "this.isMobileDisk(value)",//移动磁盘
		isMobileDisk : function(str){
	    	var isHave = true
	    	var character=['|', '/', '"', '<', '>', '@:\\'];
	        for (var i = 0; i < character.length; i++) {
	            if (str.indexOf(character[i]) >= 0) {
	                isHave = false;
	                break;
	            }
	        }
	        return isHave;
    	},
    	NetworkDirectory  : "this.isNetworkDirectory(value)",//网络目录
		isNetworkDirectory : function(str){
	    	var isHave = true
	    	var character=['|', '/', '"', '<', '>', '#:\\'];
	        for (var i = 0; i < character.length; i++) {
	            if (str.indexOf(character[i]) >= 0) {
	                isHave = false;
	                break;
	            }
	        }
	        return isHave;
    	},
    	CDROMDirectory  : "this.isCDROMDirectory(value)",//光驱目录
    	isCDROMDirectory : function(str){
	    	var isHave = true
	    	var character=['|', '/', '"', '<', '>', '$:\\'];
	        for (var i = 0; i < character.length; i++) {
	            if (str.indexOf(character[i]) >= 0) {
	                isHave = false;
	                break;
	            }
	        }
	        return isHave;
    	},
    	PipelineRoute  : "this.isPipelineRoute(value)",//光驱目录
    	isPipelineRoute : function(str){
	    	var isHave = true
	    	var character=['|', '/', '"', '<', '>', '#:\\.\\PIPE\\'];
	        for (var i = 0; i < character.length; i++) {
	            if (str.indexOf(character[i]) >= 0) {
	                isHave = false;
	                break;
	            }
	        }
	        return isHave;
    	},
		ServiceName  : "this.isServiceName(value)",
		isServiceName : function(str){
	    	if(str.indexOf("\'") >-1 || str.indexOf("\"")>-1){
	    		return false;
	    	}else{
	    		return true;
	    	}
    	},
		TextareaLength : "this.isTextareaLength(value)", //描述信息长度200
		isTextareaLength : function(str){
	    	return str.length<=200;
    	},
    	TextareaLengthHundre : "this.isTextareaLengthHundred(value)", //长度100
    	isTextareaLengthHundred : function(str){
	    	return str.length<=100;
    	},
    	Failreasion : "this.isFailreasion(value)", //描述信息长度200
		isFailreasion : function(str){
	    	return str.length<=50;
    	},
    	EncryptKey : "this.isEncryptKey(value)", //密钥长度16
    	isEncryptKey : function(str){
	    	return str.length==16||str.length==0;
    	},
    	checkCode : "this.isCheckCode(value)",
    	isCheckCode : function(val){ 
    		var a = /^.*[\u4e00-\u9fa5]+.*$/;
    		if(a.test(val)){
    			return false;
    		}else{
    			return true;
    		}
    	},
    	contNetwork : "this.iscontNetwork(value)",
    	iscontNetwork : function(val){
    		if (val.trim() == "" || val.trim() == NETWOEKTEST) {
    			return false;
    		}
    		return true;
    	},
		Cycle : "this.isCycle(value)",
		isCycle : function(val){
    		return val >= 120;
		},
		lock_times : "this.islock_times(value)",
		islock_times : function (val){
			//var ck = $("#admin_lock_switch_on").attr("checked");
			//if (ck == "checked") {
				if (val >= 1 && val <= 10) {
					return true;
				}
				return false;
			//}
		},
		lock_length : "this.islock_length(value)",
		islock_length : function (val){
			//var ck = $("#admin_lock_switch_on").attr("checked");
			var admin_lock_time = $("#admin_lock_time").val();
			//if (ck == "checked" && admin_lock_time == "m") {
			if (admin_lock_time == "m") {
				return val >= 20;
			}
		},
		clear_times : "this.isclear_times(value)",
		isclear_times : function (val){
			//var ck = $("#admin_clear_switch_on").attr("checked");
			//if (ck == "checked") {
				if (val >= 1 && val <= 10) {
					return true;
				}
				return false;
			//}
		},
		clear_length : "this.isclear_length(value)",
		isclear_length : function (val){
			//var ck = $("#admin_clear_switch_on").attr("checked");
			var admin_clear_time = $("#admin_clear_time").val();
			//if (ck == "checked" && admin_lock_time == "m") {
			if (admin_clear_time == "h") {
				return val >= 24;
			}
		},
		max_count : "this.ismax_count(value)",
		ismax_count : function (val){
			return val >= 10;
		},
		Virus_time : "this.isTime(value)",
		isTime : function(val){
    		return val >= 1;
		},
		Repwd : "this.isRepwd(value)",
		isRepwd : function(value){
			var pwd = $("#pwd").val();
			return pwd == value;
		},
		Pwd : "this.isPwd(value)",
		isPwd : function(value){
			if (value.length >= 8 && value.length <= 18){
				return true;
			}
			return false;
		},
		PwdComplexity : "this.isPwdComplexity(value)",
		isPwdComplexity : function(value){
			if(pwdComplexity==0){
				return true;
			}
			if(checkStrong(value)==4){
				return true;
			}
			return false;
		},
		SecurityIP : "this.isSecurityIP(value)",
		isSecurityIP : function (value){
			var netip = $("#netip").val();
			var ipAddr = netip.substr(0, netip.lastIndexOf('.'));
			var last_ip = netip.substr(ipAddr.length+1,netip.length);
			if (value == "255.255.255.255" && last_ip == 0) {
				validator.showTipMsg($("#netip"),"网络地址格式不正确!","","");//网络地址格式不正确!
				return false;
			}
			validator.removeTipMsg($("#netip")); //
			return true; 
			
		},
		SecurityNetIP : "this.isSecurityNetIP(value)",
		isSecurityNetIP : function(value){
			var netmask = $("#netmask").val();
			var ipAddr = value.substr(0, value.lastIndexOf('.'));
			var last_ip = value.substr(ipAddr.length+1,value.length);
			if (netmask == "255.255.255.255" && last_ip == 0) {
				return false;
			}
			return true;
		},
		ProcessNameMax : "this.isProcessNameMax(value)",
		isProcessNameMax : function(value){
			return value.length <= 46;
		},
		//身份证号校验
		isIdCard : function(number){
		var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",
		34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",
		52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
		var idcard, Y, JYM;
		var S, M;
		var idcard_array = new Array();
		idcard_array = number.split("");
		//地区检验
		if (area[parseInt(number.substr(0, 2))] == null) return false;
		//身份号码位数及格式检验
		switch (number.length) {
		case 15:
			if ((parseInt(number.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(number.substr(6, 2)) + 1900) % 100 == 0
				&& (parseInt(number.substr(6, 2)) + 1900) % 4 == 0)) {
				//测试出生日期的合法性
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;				
			} else {
				//测试出生日期的合法性
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; 
			}
			if (ereg.test(number)) {
				return true;
			} else{
				return false;
			}
			break;
		case 18:
			/*18位身份号码检测
			出生日期的合法性检查
			闰年月:
			((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
			平年月日:
			((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))*/
			if (parseInt(number.substr(6, 4)) % 4 == 0 || (parseInt(number.substr(6, 4)) % 100 == 0 
				&& parseInt(number.substr(6, 4)) % 4 == 0)) {
				//闰年出生日期的合法性正则表达式
				ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; 
			} else {
				//平年出生日期的合法性正则表达式
				ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; 
			}
			//测试出生日期的合法性
			if (ereg.test(number)) { 
				//计算校验位
				S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1])
				  + parseInt(  idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 
				  + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) 
				  + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 
				  + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 
				  + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
				Y = S % 11;
				M = "F";
				JYM = "10X98765432";
				M = JYM.substr(Y, 1); //判断校验位
				if (M == idcard_array[17]) return true; //检测ID的校验位
				else return false;	
			} else return false;
			break;
			default:
				return false;
			break;
		 }
		},//end isIdCard
		//验证子网掩码
		isMask:function(MaskStr) { 
	 		var IPArray = MaskStr.split("."); 
	 		var ip1 = parseInt(IPArray[0]); 
	 		var ip2 = parseInt(IPArray[1]); 
	 		var ip3 = parseInt(IPArray[2]); 
	 		var ip4 = parseInt(IPArray[3]);
			if ((ip1 < 0 || ip1 > 255) || (ip2 < 0 || ip2 > 255) || (ip3 < 0 || ip3 > 255) || (ip4 < 0 || ip4 > 255)) { 
       			return false; 
			} 

		 		var ip_binary = _checkIput_fomartIP(ip1) + _checkIput_fomartIP(ip2) + _checkIput_fomartIP(ip3) + _checkIput_fomartIP(ip4);  

			if(-1 != ip_binary.indexOf("01")) { 
   		 		return false; 
 			} 
			return true; 
		} ,
		isDate : function(op){
			var formatString=this['dataTypes'].format;
			formatString = formatString || "ymd";
			var m, year, month, day;
			switch(formatString){
			case "ymd" :
				m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
				if(m == null ) return false;
				day = m[6];
				month = m[5]*1;
				year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
			break;
			case "dmy" :
				m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
				if(m == null ) return false;
				day = m[1];
				month = m[3]*1;
				year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
			break;
			default :
				break;
			}
			if(!parseInt(month)) return false;
			month = month==0 ?12:month;
			var date = new Date(year, month-1, day);
			return (typeof(date) == "object" && year == date.getFullYear() && month == (date.getMonth()+1) && day == date.getDate());
			function GetFullYear(y){
				return ((y<30 ? "20" : "19") + y)|0;
			}
		}, //end isDate
		
		doFilter : function(value){
			var filter=this['dataTypes'].accept;
			return new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g,filter.split(/\s*,\s*/).join("|")),"gi").test(value);
		},//end doFilter
	
		checkLimit:function(len){
			var minval=this['dataTypes'].min || Number.MIN_VALUE;
			var maxval=this['dataTypes'].max || Number.MIN_VALUE;
			return (minval<= len && len<=maxval);
	
		},//end checkLimit
	
		LenB : function(str){
			return str.replace(/[^\x00-\xff]/g,"**").length;
		},//end LenB
	
		checkRepeat:function(value){
			 var element = this['element'];
			var to=this['dataTypes'].to;
			var toval=jQuery('input[name="'+to+'"]').eq(0).val();
			//alert("toval:::"+toval+"------------value"+value);
			 if((toval!= "undefined" || toval!= "")){
				 var str_errmsg=this['dataTypes'].msg; //获取提示信息
				 var errindex = this['errindex'];
				 if(value==toval){
					str_errmsg="校验成功";
				 }
				 validator.showTipMsg(element,str_errmsg,errindex,value==toval);
				 return value==toval;
				 
			}else if((toval== "undefined" || toval== "")&&(value=="")){
				 return false;
			}
		},//end checkRepeat
	
		checkRange : function(value){
			value = value|0;
			var minval=this['dataTypes'].min || Number.MIN_VALUE;
			var maxval=this['dataTypes'].max || Number.MAX_VALUE;
			return (minval<=value && value<=maxval);
		},//end checkRange
	
		checkCompare : function(value){
			var compare=this['dataTypes'].compare;
			if(isNaN(value)) return false;
			value = parseInt(value);
			return eval(value+compare);
		},//end checkCompare
	
		Exec : function(value){
			var reg =this['dataTypes'].regexp;
			return new RegExp(reg,"gi").test(value);
		},//end Exec
	
		mustChecked : function(){
			var tagName=this['element'].attr('name');
			var f=this['element'].parents('form');
			var v=f.find('input[name="'+tagName+'"]');
			var n=f.find('input[name="'+tagName+'"]:checked').length;
			var count = f.find('input[name="'+tagName+'"]').length;
			var minval=this['dataTypes'].min || 1;
			var maxval=this['dataTypes'].max || count;
			return (minval<=n && n<=maxval);
		},//end mustChecked
		selectChecked : function(value){
			if(value == "noParent"){
				return false;
			} else {
				return true;
			}
			//var value = this['element'].val();
		},
		doajax : function(value) {	
			var oldName = $('#oldName').val();
			oldName = jQuery.trim(oldName);
			var element = this['element'];
			var errindex = this['errindex'];
			var val = element.val(); //获取元素的值
			val = jQuery.trim(val);
			var url=this['dataTypes'].url;
			var str_errmsg=this['dataTypes'].msg; //获取提示信息
			var arr_errmsg ; //错误信息数组
			var errmsg ;     //错误信息
			arr_errmsg= str_errmsg.split('|') ;
			errmsg = arr_errmsg[errindex] ;
			var type=this['element'].attr('type');  //获取元素类型
			var Charset = jQuery.browser.msie ? document.charset : document.characterSet;
			var methodtype = (Charset.toLowerCase() == 'utf-8') ? 'post' : 'get';
			var method=this['dataTypes'].method || methodtype;
			var name = this['element'].attr('name');
			
			
			if(url=="" || url==undefined) {
				 var msg="请设定url的值";//请设定url的值
				 return  validator.showTipMsgByAjax(element,msg,false);
			}
			
			var peram = name+"="+val;
			//特殊处理多个参数
			var policyTypeid = $('#policyTypeid').val();
			var addOrUpdate = $('#addOrUpdate').val();
			if(policyTypeid){
				peram = peram + "&policyTypeid="+policyTypeid;
			}
			if(addOrUpdate){
				peram = peram + "&addOrUpdate="+addOrUpdate;
			}
			if(oldName != val){
				var s = $.ajax({
				type: method,
				url: url,
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				data: peram,
				cache: false,
				async: false,
				success: function(data){
					data = data.replace(/(^\s*)|(\s*$)/g, "");
					   if(data != 'success'){
						  errmsg = errmsg=="" ? data : errmsg;
						 // return  validator.showTipMsgByAjax(element,errmsg,false);
						   return validator.showTipMsg(element,errmsg,0,false);
					   }
					   if(data=='success') {
						   //return validator.showTipMsg(element,"校验成功!",0,false);
						    //return  validator.showTipMsgByAjax(element,"校验成功",true);
					   }
				   }
			 }).responseText;
			 s = s.replace(/(^\s*)|(\s*$)/g, "");
			 return s == 'success' ? true : false;
			}
		}//end doajaxs
	};
	
	/*ajax信息显示*/
	validator.showTipMsgByAjax=function (element,msg,isSuccess){
		var  offset=element.offset();
		var top=offset.top-xOffset;
		var left=offset.left+element.width()+5;
		if(isSuccess){
			element.removeClass(this['ErrorInput']);
			validator_msg_ico="tip-success-ico";
		}else {
			element.addClass(this['ErrorInput']);
			validator_msg_ico="tip-error-ico";
		}
		var mytip= jQuery( '<div class="validator_msg_tip"><div class="'+validator_msg_ico+'"></div>'+
								   	'<div class="validator_tip_msg_content">'+msg+
									'</div><div class="validator_msg_tip_direction validator_msg_tip_left"><em>◆</em><span>◆</span></div></div>');
		mytip.css("top", top+"px").css("left", left+"px");
		mytip.insertAfter(element); 
		return isSuccess ;
	}
	
	/*显示信息*/
	validator.showTipMsg=function (element,msg,errindex,isSuccess){
		var str_tipmsg=typeof(msg) == "undefined" ? 'unkonwn': msg;
		var arr_tipmsg = str_tipmsg.split('|');
		
		var tipmsg = arr_tipmsg[errindex] ? arr_tipmsg[errindex]: arr_tipmsg[0];
		//当信息包含"&&&&" 代表的是竖线 |
		tipmsg = tipmsg.replace(/&&&&/g, '|');
		validator.removeTipMsg(element); //移除错误信息
		var msgid = element.parent().attr('id')
		if(!isSuccess && tipmsg != "netip"){
			$('#'+msgid).prepend("<div class='for_fix_ie6_bug' style='position:relative;'><div class='tooltips_main'><div class='tooltips_box'><div class='tooltips'><div class='tooltips_msg'>"+tipmsg+"</div></div><div class='tooltips_ov'></div></div></div></div>");
			$('#'+msgid+' .tooltips_main').fadeIn("slow").animate({ marginTop: "-23px"}, {queue:true, duration:400});
		}
		return isSuccess ;
	}
	
	/*移除提示信息*/
	validator.removeTipMsg =  function(element){
		var msgid = element.parent().attr('id');
		$('#'+msgid).find('.tooltips_main').fadeOut("slow");
		$('#'+msgid).find('.tooltips_main').remove();
	}
	
	

	
	/*检测校验类型*/
	validator.checkDataType = function(element,datatype){
		var oldValue = element.val();
		var value=jQuery.trim(element.val());
		//密码可以输入空格 但要进行验证 特殊处理下
		if(datatype.indexOf("isIncludeBlank")!=-1){
			if(oldValue.indexOf(" ")!=-1){
				return false;
			}else{
				return true;
			}
		}
		this['element'] = element;
		switch(datatype){
			 case "ProcessNameMax" :
			 case "SecurityNetIP" :
			 case "SecurityIP" :
			 case "Pwd" :
			 case "Repwd" :
			 case "PwdComplexity" :
			 case "Cycle" :
			 case "Virus_time" :
			 case "TextareaLength" :
			 case "TextareaLengthHundre" :
			 case "ServiceName" :
			 case "FileCharacter" :
			 case "MobileDisk" :
			 case "NetworkDirectory" :
			 case "CDROMDirectory" :
			 case "PipelineRoute" :
			 case "Failreasion" :
			 case "EncryptKey" :
			 case "Mask" :
			 case "IdCard" :
			 case "Date" :
			 case "Repeat" :
			 case "Range" :
			 case "Compare" :
			 case "Custom" :
			 case "Group" : 
			 case "Limit" :
			 case "Select" :
			 case "LimitB" :
			 case "SafeString" :
			 case "Filter" :
			 case "lock_times":
			 case "lock_length":
			 case "clear_times":
			 case "clear_length":
			 case "max_count":
		     case "checkCode" :
		     case "contNetwork":	 
			 	return eval(this[datatype]);
			 break;
	
			 default:
				 if(datatype == "Username"){
					 if(this[datatype].test(value) == true){
						 //validator.showTipMsg(11,"用户名不能为11位纯数字!",0,false);
						 return true;
					 } else {
						 return false;
					 }
				 }
			 	return this[datatype].test(value);
			 break;
		}
	}
	
	/*ajax 校验*/
	validator.checkajax = function(element, datatype, errindex) {
		var value=jQuery.trim(element.val());
		this['element'] = element;
		this['errindex'] = errindex;
		validator.removeTipMsg(element);
		return eval(this[datatype]);
	}
	
	/*重复判断的单独提示*/
//	validator.checkrepeat = function(element, datatype, errindex) {
//		var value=jQuery.trim(element.val());
//		
//		this['element'] = element;
//		this['errindex'] = errindex;
//		validator.removeTipMsg(element);
//		return (eval(this[datatype]));
//	}

	/*校验方法*/
	validator.check=function(obj, isRemove){
		if(isRemove){
			validator.removeTipMsg(obj);
		}else{
			var isValid;
			this['valiData'] = $.trim(obj.attr('validata-options'));
			this['dataTypes']=eval("({"+this['valiData']+"})");
			var dataTypes=this['dataTypes'];
			var oldValue = obj.val();
			var value = $.trim(obj.val()); 
			validator.removeTipMsg(obj); //移除错误信息
		
			
			//判断是否为必输项
			if(dataTypes.validType == "isIncludeBlank|SafeString" || dataTypes.validType == "isIncludeBlank|Repeat"){
					if(oldValue.indexOf(" ")==-1){
						if(dataTypes.required == false && value == ""){
							validator.showTipMsg(obj,"不能为空",0,false);
							return isValid =false;
						}
//					else if(oldValue.indexOf(" ")!=-1){
//						alert(oldValue.indexOf(" "))
//						validator.showTipMsg(obj,"密码不能包含空格!",0,false);
//						return isValid =false;
//					}
				}
			} else{
				if(dataTypes.required == true && value == ""){
					validator.showTipMsg(obj,"不能为空",0,false);
					return isValid =false;
				}
				
			
//				if(dataTypes.required == true && value == "noParent"){
//				validator.showTipMsg(obj,"请选择直接上级!",0,false);
//				return isValid =false;
//				}
				if(dataTypes.required == true && value < 5 && dataTypes.validType == "RegFail"){
					validator.showTipMsg(obj,"必须为不小于5的整数",0,false);//必须为不小于5的整数
					return isValid =false;
				}
			}
//			if(dataTypes.required == true && value == "" && dataTypes.validType == "Parent"){
//				validator.showTipMsg(obj,"请选择直接上级!",0,false);
//				return isValid =false;
//			}
			//默认required为true
			if(typeof(dataTypes.required) == "undefined"){
				dataTypes.required=true;
			}
			//密码可以输入空格 但要进行验证 特殊处理下
			if(typeof(dataTypes.validType) == "undefined"){
				return isValid =true;
			}
			if(dataTypes.validType.indexOf("isIncludeBlank")!=-1){
				value = oldValue;
			}
			//如果requierd为fales并且没有值则不做校验
			if(!dataTypes.required && value=="") return true;
			var validType = dataTypes.validType.split('|');
			if(validType==""){
				return true;
			}
			//遍历validType
			jQuery.each(validType,function(index,type){
				if(typeof(validator[type]) == "undefined") {
					return  isValid = false;
				}
				//ajax 校验
				if(type=='Ajax') {
//					if(dataTypes.validName == "Username"){
//						alert(value)
//						alert(reg.test(value))
//					 if(reg.test(value) == true){
//						 //validator.showTipMsg(11,"用户名不能为11位纯数字!",0,false);
//						 return false;
//					 } else {
//						 return true;
//					 }
//				 }
			 //	return this[datatype].test(value);
					return isValid = validator.checkajax(obj, type,index);
				}
				
//				if(type=='Repeat'){
//					return validator.checkrepeat(obj, type,index);
//				}
				if(validator.checkDataType(obj,type)==false){ 
					//校验失败
					validator.showTipMsg(obj,dataTypes.msg,index,false);
					return isValid=false;
				} else { 
					// 校验成功
					validator.showTipMsg(obj,dataTypes.msg,index,true);		
					return isValid=true;
				}
			});
			return isValid;
		}
	}
	function CLASS(options){
		this.init(options)
	};
	
	
	
	/*校验表单方法*/
	$.fn.checkForm = function(showType) {
		var form=jQuery(this);
		var elements = form.find(':input[validata-options]');
		
		
		//按下键盘
		//elements.keyup(function(index){
			//return validator.check(jQuery(this));
		//});
		
		//失去焦点时验证
		elements.blur(function(index){
			var msg = jQuery(this).attr("blur");
			if (msg == "off") {
				return;
			}
			return validator.check(jQuery(this));
		});
		
		elements.focus(function(index){
			jQuery(this).attr("blur","");
			return validator.check(jQuery(this), true);
		});
		//内容改变时验证
		//elements.change(function(index){
		//return validator.check(jQuery(this));
		//})
		
		//当form表单提交的时候验证
		form.submit(function(){
			var isValid = true;
			var errIndex= new Array();
			var n=0;
			elements.each(function(i){
				//校验是否失败
				//alert(validator.check(jQuery(this)));
				if(validator.check(jQuery(this))==false){
					isValid  = false;
					errIndex[n++]=i;
				};
			});
			//如果校验返回失败焦点与提示信息
			if(isValid==false){
				//elements.eq(errIndex[0]).focus().select();
				return false;
			}
			return true;
		});	
	}
	
})(jQuery);