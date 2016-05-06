//语言信息字符串全局变量
var languageMapXml = "";

/**
 * 获取服务器所有语言信息，以字符串信息返回
 * @return
 */
function getLanguageMapString() {
	$.ajax({
		type : "POST", 
		async: false, 
		url : "MainViewServlet?action=getLanguageMapString",
		success : function(responseText) {  
		languageMapXml = responseText;
			
		//解析数据
		parseStrToMap();
		}
	});
}

/**
 * 将字符串信息解析，封装到各个模块的map
 * @return
 */
function parseStrToMap() {
    $("Basic",languageMapXml).children().each(function(){
    	basic[this.tagName.toLowerCase()]=$(this).text();  
    });
    
    $("Norm",languageMapXml).children().each(function(){
    	norm[this.tagName.toLowerCase()]=$(this).text();  
    });
    
    $("System",languageMapXml).children().each(function(){
    	system[this.tagName.toLowerCase()]=$(this).text();  
    });
    
    $("Audit",languageMapXml).children().each(function(){
    	audit[this.tagName.toLowerCase()]=$(this).text();  
    });
    
    $("Common",languageMapXml).children().each(function(){
    	common[this.tagName.toLowerCase()]=$(this).text();  
    });

    $("Home",languageMapXml).children().each(function(){
    	home[this.tagName.toLowerCase()]=$(this).text();  
    });

    $("Topology",languageMapXml).children().each(function(){
    	topology[this.tagName.toLowerCase()]=$(this).text();  
    });
}
