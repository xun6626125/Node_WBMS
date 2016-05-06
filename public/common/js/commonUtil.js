/**
  * 打开信息提示
  * @param content 文本内容
  * @param time 窗口显示时间
  * @param closeMethod 窗口关闭后回调方法
  */
function showTips(content, time, closeMethod){
	if (time == "" || null == time) {
		time = 1.5;
	}
	
	//定义窗口icon要显示的图片
	var icon = 'succeed';
	if(content!=Loc.saveSuccess && content!= Loc.resetSuccess && content != Loc.emailError){
		icon = 'error';
	}
	art.dialog.through({   
		content: content,
		id: 'Tips',
		title: false,
        cancel: false,
		fixed: true,
		lock: true ,
		icon: icon,
		close: closeMethod,
		time:time
	});	
}

/**
 * 打开信息提示 - 新
 * @param content 文本内容
 * @param icon 显示类型图片 succeed 成功; error 失败; warning 警告;
 * @param time 窗口显示时间
 * @param closeMethod 窗口关闭后回调方法
 */
function showMessage(content, icon, time, closeMethod){
	art.dialog.through({   
		content: content,
		id: 'Tips',
		title: false,
        cancel: false,
		fixed: true,
		lock: true ,
		icon: icon,
		close: closeMethod,
		time:time
	});	
}

/**
 * 添加niceScroll组件
 * 黑色皮肤使用
 * @param domValue 具体所要添加DOM节点选中标示
 */
function addNiceScroll(domValue){
	$(domValue).niceScroll({
		touchbehavior:false,
		cursorcolor:"#000",
		cursoropacitymax:0.7,
		cursorwidth:12,
		cursorborder:"1px solid #FFAF60",
		cursorborderradius:"3px",
		autohidemode:false
	});
}

/**
  * 获取分页
  * @param pageNo 当前页
  * @param pageSize 每页显示的数据条数
  * @param totalRecord 数据总条数
  * @param totalPage 总页数
  * @param queryStr 其他查询条件 "&keyWord=ABC&userName=CDD;"
  * @param url 跳转路径
  */
function getPageHtml(pageNo, pageSize, totalRecord, totalPage, queryStr, url){
	//根据修改的条目数进行对页面高度的刷新
	setPageHeight(pageSize, totalRecord);
	
	var pageSizeGroup = [10, 15, 20, 25, 50, 100];
	var start = 0;
	var pageEnd = 0;
	if (pageNo < 6) {
		start = 1;
	} else {
		start = pageNo - 5;
	}
	if ((pageNo + 5 )> totalPage) {
		pageEnd = totalPage;
	} else {
		pageEnd = pageNo + 5;
	}
	var pageNumArr = [];
	for (var i=start; i<=pageEnd; i++) {
		pageNumArr.push(i);
	}
	document.write("<div class='page'><span class='pl'>每页<b> ");
	document.write('<select id="pageSizeSelect" onchange="changePageSize(this, \'' + url + '\', \''+ queryStr + '\');">');
	for(var i=0; i<pageSizeGroup.length; i++){
		if(pageSize == pageSizeGroup[i]){
			document.write("<option value=" + pageSizeGroup[i] + " selected='selected'>" + pageSizeGroup[i] + "</option>");
		}else{
			document.write("<option value=" + pageSizeGroup[i] + ">" + pageSizeGroup[i] + "</option>");
		}
	}
	document.write("</select>");
	document.write(" </b>条&nbsp;&nbsp;</span>");
	document.write("<div class='page'><span class='pl'>共<b> "+totalRecord+" </b>条记录</span>");
	document.write("<span class='pr'>");
	//alert("pageSize-" + pageSize + "-totalRecord-" + totalRecord + "-totalPage-" + totalPage + "-pageNo-" + pageNo);
	if(totalRecord>10){
		if(pageNo > 6){
			document.write('<a class="" onclick="reloadPageList(\''+ url +'\', \''+ '&pageNo=1&pageSize='+pageSize + queryStr +'\')" >首页</a>  ');
		}
		if(pageNo != 1){
			document.write(' <a class="" onclick="reloadPageList(\''+ url +'\', \''+ '&pageNo='+ (pageNo-1) +'&pageSize='+ pageSize + queryStr +'\')" >上一页</a> ');
		}
		if(totalPage != 1){
			for(var i=0; i<pageNumArr.length; i++){
				var pageNum = pageNumArr[i];
				if(pageNum == pageEnd && pageNum == pageNo){
					document.write('<a class="selected" onclick="reloadPageList(\''+ url +'\', \''+ '&pageNo='+ pageNum +'&pageSize='+ pageSize + queryStr +'\')">'+ pageNum +'</a> ');
				}
				if(pageNum == pageEnd && pageNum != pageNo){
					document.write('<a class="" onclick="reloadPageList(\''+ url +'\', \''+ '&pageNo='+ pageNum +'&pageSize='+ pageSize + queryStr +'\')">'+ pageNum +'</a> ');
				}
				if(pageNum != pageEnd && pageNum == pageNo){
					document.write('<a class="selected" onclick="reloadPageList(\''+ url +'\', \''+ '&pageNo='+ pageNum +'&pageSize='+ pageSize + queryStr +'\')">'+ pageNum +'</a>  - ');
				}
				if(pageNum != pageEnd && pageNum != pageNo){
					document.write('<a class="" onclick="reloadPageList(\''+ url +'\', \''+ '&pageNo='+ pageNum +'&pageSize='+ pageSize + queryStr +'\')">'+ pageNum +'</a> - ');
				}
			}
			if(pageNo != totalPage){
				document.write('<a class="" onclick="reloadPageList(\''+ url +'\', \''+ '&pageNo='+ (pageNo+1) +'&pageSize='+ pageSize + queryStr +'\')">下一页</a> ');
			}
			if(totalPage != pageEnd){
				document.write('<a class="" onclick="reloadPageList(\''+ url +'\', \''+ '&pageNo='+ totalPage +'&pageSize='+ pageSize + queryStr +'\')">末页</a>');
			}
		}
	}else{
		if((pageSize == totalRecord) && (pageNo-totalPage == 1)){
			document.write('<a class="" onclick="reloadPageList(\''+ url +'\', \''+ '&pageNo=1&pageSize='+pageSize + queryStr +'\')" >上一页</a>  ');
			document.write('<a class="" onclick="reloadPageList(\''+ url +'\', \''+ '&pageNo='+ totalPage +'&pageSize='+ pageSize + queryStr +'\')">'+ totalPage +'</a> - ');
			document.write('<a class="selected" onclick="reloadPageList(\''+ url +'\', \''+ '&pageNo='+ pageNo +'&pageSize='+ pageSize + queryStr +'\')">'+ pageNo +'</a> ');
		}
	}
	document.write("</span></div>");
}

/**
 * 更改每页显示数据条目数
 */
function changePageSize(option, url, params){
	var newPageSize = option.value;
	parent.SELECT_PAGESIZE = newPageSize;
	params = params + "&pageSize=" + newPageSize + "&pageNo=1";
	reloadPageList(url, params);
}

/**
 * 根据当页显示条目数进行对页面高度的刷新
 */
function setPageHeight(pageSize, totalRecord){
    var bodyHeight = parent.parent.document.body.clientHeight - 378;
    if(bodyHeight>(25*pageSize)){
    	if(totalRecord<pageSize){
			$("#dataTable").css("height", 25*totalRecord+"px");
    	}else{
    		$("#dataTable").css("height", 25*pageSize+"px");
    	}
    }else{
    	if(totalRecord<pageSize){
    		if(bodyHeight>(25*totalRecord)){
    			$("#dataTable").css("height", 25*totalRecord+"px");
    		}else{
    			$("#dataTable").css("height", bodyHeight+"px");
    		}
    	}else{
    		$("#dataTable").css("height", bodyHeight+"px");
    	}
    }
    return;
}

/**
 * 根据当页显示条目数进行对页面高度的刷新 - 仅供新打开页面使用
 */
function setNewPageHeight(pageSize, totalRecord){
    var bodyHeight = parent.document.body.clientHeight - 320;
    if(bodyHeight>(25*pageSize)){
    	if(totalRecord<pageSize){
			$("#dataTable").css("height", 25*totalRecord+"px");
    	}else{
    		$("#dataTable").css("height", 25*pageSize+"px");
    	}
    }else{
    	if(totalRecord<pageSize){
    		if(bodyHeight>(25*totalRecord)){
    			$("#dataTable").css("height", 25*totalRecord+"px");
    		}else{
    			$("#dataTable").css("height", bodyHeight+"px");
    		}
    	}else{
    		$("#dataTable").css("height", bodyHeight+"px");
    	}
    }
    return;
}

/**
 * 页面自适应设置列表宽度,解决数据与列头不对齐的问题(PS:注意最后一个宽度百分比不可大于第一个，火狐会出问题)
 */
function onRePageSetWidth(){
	//判断是否为火狐浏览器
	var isFirefox = $.browser.mozilla;
	//各个浏览器差异宽变量
	var widthGapVar, noScrollWidthGapVar; 
	var dataTileLastTd = $("#dataTitle td:last");
	var dataTableLitWidth = $("#dataTableList").width();
	var percentageWidth = dataTileLastTd.attr('width');
	percentageWidth = parseInt(percentageWidth)/100;
	//判断是否包含滚动条
	if(isScroll()){
		//火狐需特殊处理
		if(isFirefox){
			dataTableLitWidth = dataTableLitWidth * percentageWidth + 2;
		}else{//其他浏览器
			dataTableLitWidth = dataTableLitWidth * percentageWidth - 2;
		}
		dataTileLastTd.css('width', dataTableLitWidth);
	}else{
		//火狐需特殊处理
		if(isFirefox){
			dataTableLitWidth = dataTableLitWidth * percentageWidth - 15;
		}else{//其他浏览器
			dataTableLitWidth = dataTableLitWidth * percentageWidth - 19;
		}
		dataTileLastTd.css('width', dataTableLitWidth);
	};
}


/**
 * 导出
 * @param {Object} url
 */
function toExport(url,urlExport){
    art.dialog.open(url, { 
	     width: 500,
	     height: 220 ,
	     title: "导出", 
	     drag: true,
	     resize:false,
	     lock: true
     });
}

/**
 * 导入
 * @param {Object} url
 */
function toImport(url, title){
    art.dialog.open(url, { 
	     width: 500,
	     height: 220 ,
	     title: title, 
	     drag: true,
	     resize:false,
	     lock: true
     });
}
/**
 * 所有的添加编辑页面弹出窗口
 * @param {Object} url弹出的页面路径
 * @param {Object} title标题
 */
function toEdit(url,title){
	var widths = 480;
	var heights = 300;
	
	if(title == "编辑职位" || title == "添加职位"){//添加职位、编辑职位
		widths = 520;
		heights = 510;
	}
	
	if(title == "职位详细信息"){//职位详细信息
		widths = 600;
	}
	
	
    art.dialog.open(url, { 
	     width: widths,
	     height: heights,
	     title: title, 
	     resize:false,
	     drag: true,
	     lock: true,
	     padding:0,
	     esc:false
     });
}

/**
 * 全选/反选
 * @param type
 * @return
 */
function checkedAll(type){
	var signed = document.getElementById(type);
	var checkbox = document.getElementsByName(type);
    for(var i=0;i<checkbox.length;i++){
    	checkbox[i].checked = signed.checked;
    }			
}

/**
 * 取消全选
 * @param type
 * @return
 */
function changeCheckedAll(type){
	var signed = document.getElementById(type);
	var checkbox = document.getElementsByName(type);
	var checkFlag = true ;
	for(var i=0;i<checkbox.length;i++){
    	if(!checkbox[i].checked){
    		checkFlag = false;
    		break;
    	}
    }
	if(0 == checkbox.length){
		checkFlag = false;
	}
    signed.checked = checkFlag;
}


/**
 * 判断当前页面列表数据是否出现了滚动条
 */
function isScroll(){
	var isScroll = false;
	var dataTable = document.getElementById('dataTable');
	if (dataTable.clientWidth < dataTable.offsetWidth){
		isScroll = true;
	}
	return isScroll;
}

/**
 * 根据URL以及参数进行对页面的刷新
 */
function reloadPageList(url, params){
	if(parent.document.getElementById('beginDate')){
		parent.document.getElementById('beginDate').value = parent.BEGIN_DATE;
		parent.document.getElementById('endDate').value = parent.END_DATE;
		params = params + "&beginDate=" +parent.BEGIN_DATE+ "&endDate=" +parent.END_DATE;
	}
	if(parent.document.getElementById('keyWord')){
		parent.document.getElementById('keyWord').value = parent.KEYWORD_VALUE;
		params = params + "&keyWord="+parent.KEYWORD_VALUE;
	}
	if(document.getElementById('keyWord')){
		var keyWord = document.getElementById('keyWord').value;
		params = params + "&keyWord="+keyWord;
	}
	//Fixlet补丁安全级别
	if(parent.document.getElementById('security')){
		var security = parent.document.getElementById('security').value;
		params = params + "&security=" + security;
	}
	if(document.getElementById('security')){
		var security = document.getElementById('security').value;
		params = params + "&security="+security;
	}
	//站点
	if(parent.document.getElementById('searchBy')){
		var searchBy = parent.document.getElementById('searchBy').value;
		params = params + "&searchBy=" + searchBy;
	}
	//补丁策略
	if(parent.PATCH_WEIGHT != ""){
		params = params + "&weight="+parent.PATCH_WEIGHT;
	}
	//终端检测排行-检测类型
	if(parent.document.getElementById('detectType')){
		//parent.document.getElementById('keyWord').value = parent.DETECT_TYPE;
		params = params + "&type="+parent.document.getElementById('detectType').value;
	}
	//提供给拓扑视图列表使用
	if(parent.document.getElementById('keyWordByList')){
		parent.document.getElementById('keyWordByList').value = parent.KEYWORD_VALUE;
		params = params + "&keyWord="+parent.KEYWORD_VALUE;
		if(parent.document.getElementById('keyWordByList').value==""){
			parent.document.getElementById('keyWordByList').value=topology['inputiporname'];//请输入查询的IP或名称...
		}
	}
	window.location.href = url + params;
}

//页面加载效果
function overLayout(){
	var wrapElement = document.getElementsByTagName('html')[0];
	var insertHTML = document.createElement("div");
	var insertDiv = document.createElement("div");
	insertDiv.className = 'loadingShow'; 
	insertDiv.innerHTML="<div style='padding-top:15px;margin-left:50px;'>正在努力为您加载...<div>";
	insertHTML.className = 'divOverlay'; 
	wrapElement.appendChild(insertHTML);
	wrapElement.appendChild(insertDiv);
	
}
//页面加载完成后显示页面
function showLayout(){
	if($('.divOverlay').length>0&&$('.loadingShow').length>0)
	{
		$('.divOverlay').remove();
	 	$('.loadingShow').remove();
	}
}

//检测是否安装flash，以及当前flash的版本
function flashChecker(){

	var iFlash = 0;
    var version = 0;
    var isIE = navigator.userAgent.toLowerCase().indexOf("msie") != -1
    if(isIE){
        //for IE
        if (window.ActiveXObject) {
            var control = null;
            try {
                control = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            } catch (e) {
                iFlash = 0;
            }
            if (control) {
                iFlash = 1;
                version = control.GetVariable('$version').substring(4);
                version = version.split(',');
                version = parseInt(version[0]);
            }
        }
    }else{
        //for other
        if (navigator.plugins) {
          for (var i=0; i < navigator.plugins.length; i++) {
            if (navigator.plugins[i].name.toLowerCase().indexOf("shockwave flash") >= 0) {
              iFlash = 1;
              version = navigator.plugins[i].description.substring(navigator.plugins[i].description.toLowerCase().lastIndexOf("Flash ") + 6, navigator.plugins[i].description.length);
              version = parseInt(version);
            }
          }
        }
    }
	return {f:iFlash,v:version};
}



/**
 * 将字符串的日期格式转成日期格式
 */
function strToDate(str, isIncludeHMS) { 
	var tempStrs = str.split(" ");
	var dateStrs = tempStrs[0].split("-");
	var year = parseInt(dateStrs[0], 10);
	var month = parseInt(dateStrs[1], 10);
	var day = parseInt(dateStrs[2], 10); 
	if(isIncludeHMS=="false"){
		var date = new Date(year, month, day); 
	}else{
		var timeStrs = tempStrs[1].split(":"); 
		var hour = parseInt(timeStrs [0], 10); 
		var minute = parseInt(timeStrs[1], 10); 
		var second = parseInt(timeStrs[2], 10); 
		var date = new Date(year, month, day, hour, minute, second); 
		
	};
	
	return date;
}

/**
  * 删除字符串中所有空格
  * @memberOf {TypeName} 
  * @return {TypeName} 
  */
 String.prototype.trim=function(){
    return this.replace(/\s+/g,"");
 }
 
 /**
  * 删除字符串左边的空格
  * @memberOf {TypeName} 
  * @return {TypeName} 
  */
  String.prototype.ltrim=function(){
    return this.replace(/(^\s*)/g,"");
 }
  
  /**
   * 删除字符串右边的空格
   * @memberOf {TypeName} 
   * @return {TypeName} 
   */
  String.prototype.rtrim=function(){
    return this.replace(/(\s*$)/g,"");
 }
  
 /**
  * 删除字符串左、右的空格
  * @memberOf {TypeName} 
  * @return {TypeName} 
  */
  
 String.prototype.lrtrim=function(){
	var str = this,
  	str = str.replace(/^\s\s*/, ''),
 	 ws = /\s/,
  	i = str.length;
 	 while (ws.test(str.charAt(--i)));
  	return str.slice(0, i + 1);

 }
 
 /**
  * 过滤特殊字符
  * 只能是中英文、数字、短横线
  * @memberOf {TypeName} 
  * @return {TypeName} 
  */
 String.prototype.fchar=function(){
	var str = this;
	var depReg = /^[\u4e00-\u9fa5A-Za-z0-9\-]+$/;
	return depReg.test(str);
 }
 
 /**
  * 统计字符串的空格的个数
  * @memberOf {TypeName} 
  * @return {TypeName} 
  */
  
 String.prototype.countSpace=function(){
	var str = this.lrtrim();
	var reg2 = /\s/;
	var m =0;
	for(i=0;i<str.length;i++){
			if( reg2.test(str[i])){
				m++;
			}
		}
		if(m == str.length){
			//document.getElementById("regPrinterName").innerHTML="打印机名不能为空";
			return false;
		}
  	return true;

 }

/**
 * 处理placeholder属性不兼容IE6789
 * @Author huxx
 * @time 2015-05-22 
 */
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            var eId = self.attr('id');
            //因登陆页面样式不同 ，暂时不使用
            if(eId=="username"||eId=="password"||eId=="captcha"){
            	return false;
            }else{
            	self.wrap($('<span></span>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
                var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
                var holder = $('<span id="holderId"></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top+3, height:h, lienHeight:h, paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
                if(self.val()!=""){
                	holder.hide();
                };
                self.focusin(function(e) {
                    holder.hide();
                }).focusout(function(e) {
                    if(!self.val()){
                        holder.show();
                    }
                });
                holder.click(function(e) {
                    holder.hide();
                    self.focus();
                });
                //绑定值变更事件，处理当分页等修改keyWord值事实时如果为空则显示查询条件
                self.bind({
                	"propertychange":function(e){
                		if(typeof(self.val()) == "undefined"||self.val()==""||self.val()==null) {
                			holder.show();
                		}else{
                			holder.hide();
                		}  
                	} 
                }) 
            }
        });
    }
};
//执行
jQuery(function(){
    JPlaceHolder.init();    
});
