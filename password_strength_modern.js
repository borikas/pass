function PasswordStrengther (element) {
    element.PasswordStrengther = this;
    PasswordStrength.watch(element);
}

var PasswordStrength = {
    watch: function (password_input_id) {
        var input = document.getElementById(password_input_id);

        var div = document.createElement('div');
        var container = document.createElement('div');
        container.className='password_strength_container';
        container.style.width = getComputedCSSPropertyValue(input,'width');

        input.parentNode.appendChild(container);

        var bg_elm = document.createElement('div');
        bg_elm.className='password_strength_bg';
        container.appendChild(bg_elm);

        var elm = document.createElement('div');
        elm.cur_score = 0;
        elm.className='password_strength';

        container.appendChild(elm);

        for (var i = 1; i <= 3; i++) {
            var cls = {'class': 'password_strength_separator'};
            var style = {left: 25*i + '%'};
            var s = document.createElement('div');
            s.className = cls;
            s.style = style;
            container.appendChild(s);
        }

        var bubble_text = document.createElement('span');
        bubble_text.id = 'bubble_text';

        info_button = document.createElement('a');
        info_button.setAttribute('href', '#');
        info_button.setAttribute('tabindex', '-1');
        info_button.className='password_strength_icon';

        container.appendChild(info_button);

        var button_img = document.createElement('img');
        button_img.setAttribute('src', 'images/img.png');
        button_img.style.border = 'none';
        button_img.className = 'a_popup_information';
        button_img.id = 'a_popup_information';
        button_img.style.width = '16px';
        button_img.style.height = '16px';
        info_button.appendChild(button_img);


        var password_desc = document.createElement('div');
        password_desc.className='password_strength_desc';
        password_desc.update = '&nbsp;';
        container.appendChild(password_desc);

        var clearfix = document.createElement('div');
        clearfix.className='clearfix';
        container.appendChild(clearfix);

        var color_map = [
            "",
            "#c81818",
            "#ffac1d",
            "#a6c060",
            "#27b30f"
        ];
        var word_map = [
// TRANSLATORS the following strings refer to a password strength meter on the registration page
            ["", ("Very weak")],
            ["#c81818", ("Weak")],
            ["#e28f00", ("So-so")],
            ["#8aa050", ("Good")],
            ["#27b30f", ("Great!")]
        ];
        var last_pwd = '';

        var animator = function () {
            // var pwd = $F(input);
            var pwd = document.getElementById(password_input_id).value;
            if (pwd == last_pwd) {
                return;
            }
            last_pwd = pwd;
            var score, word;
            if (pwd == 'correcthorsebatterystaple' || pwd == 'Tr0ub4dour&3' || pwd == 'Tr0ub4dor&3') { // easteregg
                score = 0;
                word = ['', 'lol'];
                if (pwd == 'correcthorsebatterystaple') {
// TRANSLATORS this text is displayed rarely, whenever a user selects a password that is from this comic:
// http://imgs.xkcd.com/comics/password_strength.png
                    // bubble_text.update = "Whoa there, don't take advice from a webcomic too literally ;)";
                } else {
// TRANSLATORS this text is displayed rarely, whenever a user selects a password that is from this comic:
// http://imgs.xkcd.com/comics/password_strength.png
                    //  bubble_text.update = "Guess again";
                }
            } else {
                score = PasswordStrength.score(pwd);
                word = word_map[score];

            }


            password_desc.innerHTML = pwd.length ? word[1] : "&nbsp;";
            password_desc.style.color = word[0];
            if (pwd.length && score < 3) {

                button_img.style.display = '';
            }  else {
                button_img.style.display = 'none';

            }
            var color_ind = score;
            elm.style.backgroundColor = color_map[color_ind];
            elm.cur_score = score;
            if (score == 0) {
                elm.style.width = "0%";
            }
            else {
                elm.style.width = (score * 25) + "%";
            }
        };
        setInterval(animator, 350);
    },

    score: function (str) {
        if (!window.zxcvbn) {
            return 0;
        }
        var result = zxcvbn(str, 'dropbox votebox');
        return result.score;
    }
};
// inline copy of /static/javascript/external/zxcvbn-async.js
// (with modified src to match metaserver's zxcvbn.js location.)
(function(){var a;a=function(){var a,b;b=document.createElement("script");b.src="zxcvbn.js";b.type="text/javascript";b.async=!0;a=document.getElementsByTagName("script")[0];return a.parentNode.insertBefore(b,a)};null!=window.attachEvent?window.attachEvent("onload",a):window.addEventListener("load",a,!1)}).call(this);

function getComputedCSSPropertyValue(element, CSSProperty) {
    return (typeof getComputedStyle == "undefined" ? element.currentStyle : getComputedStyle(element, null))[CSSProperty];
}

var tooltip = {
    	    create:function (args) {
    	        args = args || {};
    	        var default_args = {
                    'img':true,
                    'border':'1px solid #000000',
                    'bg_img_1':'images/bubble_tl.png',
                    'bg_img_2':'images/bubble_t.png',
                    'bg_img_3':'images/bubble_tr.png',
                    'bg_img_4':'images/bubble_b_1.png',
                    'bg_img_5':'images/bubble_b_2.png',
                    'bg_img_6':'images/bubble_bl.png',
                    'bg_img_7':'images/bubble_b.png',
                    'bg_img_8':'images/bubble_br.png',
                    'bg_color':'#ffffff',
                    'width':13,
                    'height':13,
                    'font':12,
                    'id_el':[],
                    'id_txt':[],
                    'pos':'bottomright',
                    't':10,
                    'l':15,
                    'timer_on':30,
                    'speed_on':5,
                    'timer_off':30,
                    'speed_off':5,
                    'alpha_end':100
            }

        for(var index in default_args) {
                if(typeof args[index] == "undefined") args[index] = default_args[index];
            }
	        var ie = window.navigator.appName=='Microsoft Internet Explorer' ? true : false;
	        var el=[];
	        el[0]= document.createElement('div');
	        el[0].setAttribute('id', 'tooltip_panel');
	        el[0].setAttribute('style', 'position: absolute; z-index: 30; visibility:hidden; display:none;');
	        document.body.appendChild(el[0]);

            el[1]= document.createElement('table');
	        el[1].setAttribute('border', '0');
	        el[1].setAttribute('cellspacing', '0');
	        el[1].setAttribute('cellpadding', '0');
	        el[0].appendChild(el[1]);

	        el[2]= document.createElement('tr');
	        el[1].appendChild(el[2]);

	        el[14]= document.createElement('td');
	        el[2].appendChild(el[14]);

	        el[3]= document.createElement('div');
	        if(args['img']) {
    	            if(ie && args['bg_img_1'].toLowerCase().indexOf('.png')!= -1) {
        	                el[3].setAttribute('style', 'background:none; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+args['bg_img_1']+'",sizingMethod="scale"); width:'+args['width']+'px; height:'+args['height']+'px;');
        	            }
    	            else {
        	                el[3].setAttribute('style', 'background-image:url('+args['bg_img_1']+'); width:'+args['width']+'px; height:'+args['height']+'px;');
        	            }
    	        }
	        else {
    	            el[3].setAttribute('style', 'border-top:'+args['border']+'; border-left:'+args['border']+'; background-color:'+args['bg_color']+'; width:'+args['width']+'px; height:'+args['height']+'px;');
    	        }
	        el[14].appendChild(el[3]);

	        el[15]= document.createElement('td');
	        el[2].appendChild(el[15]);

	        el[4]= document.createElement('div');
	        if(args['img']) {
    	            if(ie && args['bg_img_2'].toLowerCase().indexOf('.png')!= -1) {
        	                el[4].setAttribute('style', 'background:none; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+args['bg_img_2']+'",sizingMethod="scale"); height:'+args['height']+'px;');
        	            }
    	            else {
        	                el[4].setAttribute('style', 'background-image:url('+args['bg_img_2']+'); height:'+args['height']+'px;');
        	            }
    	        }
	        else {
    	            el[4].setAttribute('style', 'border-top:'+args['border']+'; background-color:'+args['bg_color']+'; height:'+args['height']+'px;');
    	        }
	        el[15].appendChild(el[4]);

	        el[16]= document.createElement('td');
	        el[2].appendChild(el[16]);

	        el[5]= document.createElement('div');
	        if(args['img']) {
    	            if(ie && args['bg_img_3'].toLowerCase().indexOf('.png')!= -1) {
        	                el[5].setAttribute('style', 'background:none; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+args['bg_img_3']+'",sizingMethod="scale"); width:'+args['width']+'px; height:'+args['height']+'px;');
        	            }
    	            else {
        	                el[5].setAttribute('style', 'background-image:url('+args['bg_img_3']+'); width:'+args['width']+'px; height:'+args['height']+'px;');
        	            }
    	        }
	        else {
    	            el[5].setAttribute('style', 'border-top:'+args['border']+'; border-right:'+args['border']+'; background-color:'+args['bg_color']+'; width:'+args['width']+'px; height:'+args['height']+'px;');
    	        }
	        el[16].appendChild(el[5]);

	        el[6]= document.createElement('tr');
	        el[1].appendChild(el[6]);

	        el[7]= document.createElement('td');
	        if(args['img']) {
    	            if(ie && args['bg_img_4'].toLowerCase().indexOf('.png')!= -1) {
        	                el[7].setAttribute('style', 'background:none; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+args['bg_img_4']+'",sizingMethod="scale"); width:'+args['width']+'px;');
        	            }
    	            else {
        	                el[7].setAttribute('style', 'background-image:url('+args['bg_img_4']+'); width:'+args['width']+'px;');
        	            }
    	        }
	        else {
                 el[7].setAttribute('style', 'border-left:'+args['border']+'; background-color:'+args['bg_color']+'; width:'+args['width']+'px;');
    	        }
	        el[6].appendChild(el[7]);

	        el[17]= document.createElement('td');
	        el[6].appendChild(el[17]);

	        el[8]= document.createElement('div');
	        el[8].setAttribute('id', 'td_tooltip_txt');
	        el[8].setAttribute('style', 'font-family:Tahoma,Verdana,Arial,Times New Roman,Helvetica,sans-serif; font-size:'+args['font']+'px; background-color:'+args['bg_color']+';white-space:nowrap;');
	        el[17].appendChild(el[8]);

	        el[9]= document.createElement('td');
	        if(args['img']) {
    	            if(ie && args['bg_img_5'].toLowerCase().indexOf('.png')!= -1) {
        	                el[9].setAttribute('style', 'background:none; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+args['bg_img_5']+'",sizingMethod="scale"); width:'+args['width']+'px;');
        	            }
    	            else {
        	                el[9].setAttribute('style', 'background-image:url('+args['bg_img_5']+'); width:'+args['width']+'px;');
        	            }
    	        }
	        else {
    	            el[9].setAttribute('style', 'border-right:'+args['border']+'; background-color:'+args['bg_color']+'; width:'+args['width']+'px;');
    	        }
	        el[6].appendChild(el[9]);

	        el[10]= document.createElement('tr');
	        el[1].appendChild(el[10]);

	        el[18]= document.createElement('td');
	        el[10].appendChild(el[18]);

	        el[11]= document.createElement('div');
	        if(args['img']) {
    	            if(ie && args['bg_img_6'].toLowerCase().indexOf('.png')!= -1) {
        	                el[11].setAttribute('style', 'background:none; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+args['bg_img_6']+'",sizingMethod="scale"); width:'+args['width']+'px; height:'+args['height']+'px;');
        	            }
    	            else {
        	                el[11].setAttribute('style', 'background-image:url('+args['bg_img_6']+'); width:'+args['width']+'px; height:'+args['height']+'px;');
        	            }
    	        }
	        else {
    	            el[11].setAttribute('style', 'border-bottom:'+args['border']+'; border-left:'+args['border']+'; background-color:'+args['bg_color']+'; width:'+args['width']+'px; height:'+args['height']+'px;');
    	        }
	        el[18].appendChild(el[11]);

	        el[19]= document.createElement('td');
	        el[10].appendChild(el[19]);

	        el[12]= document.createElement('div');
	        if(args['img']) {
    	            if(ie && args['bg_img_7'].toLowerCase().indexOf('.png')!= -1) {
        	                el[12].setAttribute('style', 'background:none; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+args['bg_img_7']+'",sizingMethod="scale"); height:'+args['height']+'px;');
        	            }
    	            else {
       	                 el[12].setAttribute('style', 'background-image:url('+args['bg_img_7']+'); height:'+args['height']+'px;');
        	            }
    	        }
	        else {
    	            el[12].setAttribute('style', 'border-bottom:'+args['border']+'; background-color:'+args['bg_color']+'; height:'+args['height']+'px;');
    	        }
	        el[19].appendChild(el[12]);

	        el[20]= document.createElement('td');
	        el[10].appendChild(el[20]);

	        el[13]= document.createElement('div');
	        if(args['img']) {
    	            if(ie && args['bg_img_8'].toLowerCase().indexOf('.png')!= -1) {
        	                el[13].setAttribute('style', 'background:none; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+args['bg_img_8']+'",sizingMethod="scale"); width:'+args['width']+'px; height:'+args['height']+'px;');
        	            }
    	            else {
        	                el[13].setAttribute('style', 'background-image:url('+args['bg_img_8']+'); width:'+args['width']+'px; height:'+args['height']+'px;');
        	            }
    	        }
	        else {
    	            el[13].setAttribute('style', 'border-bottom:'+args['border']+'; border-right:'+args['border']+'; background-color:'+args['bg_color']+'; width:'+args['width']+'px; height:'+args['height']+'px;');
    	        }
	        el[20].appendChild(el[13]);

	        this.param.pos=args['pos'];
	        this.param.l=args['l'];
	        this.param.t=args['t'];
	        this.param.timer_on=args['timer_on'];
	        this.param.speed_on=args['speed_on'];
	        this.param.timer_off=args['timer_off'];
	        this.param.speed_off=args['speed_off'];
	        this.param.alpha_end=args['alpha_end'];
	        this.param.id_el=args['id_el'];
	        this.param.id_txt=args['id_txt'];
	        this.param.start();
	    },
	    get_elm:function (n) {
    	        switch(n) {
        	           case 1:
            	           return document.getElementById('tooltip_panel');
            	       break;
            	       case 2:
            	            return document.getElementById('td_tooltip_txt');
            	       break;
            	}
    	    },
	    param: {
    	       pos:'auto',
        	        t:0,
        	        l:0,
        	        timer_on:0,
        	        speed_on:0,
        	        timer_off:0,
        	        speed_off:0,
        	        alpha:0,
        	        alpha_end:0,
        	        id_el:[],
        	        id_txt:[],
        	        get_tiou:0,
        	        start: function () {
        	            var tooltip_el;
        	            for(var i=0;i<tooltip.param.id_el.length;i++) {
                	         tooltip_el=document.getElementById(tooltip.param.id_el[i]);
                	         tooltip_el.onmousemove=function (e) {
                    	            tooltip.onmmo(e);
                    	     }
                	         tooltip_el.onmouseover=function (e) {
                    	            tooltip.onmov(e,this.id);
                    	            //tooltip.onmov(e,this.getAttribute('id'));
                    	     }
                	         tooltip_el.onmouseout=function () {
                   	                tooltip.onmou();
                    	     }
                	    }

        	        }
    	    },
	    onmmo: function (e) {
    	        var xy = this.getp(e);
    	        var p = this.param.pos;
    	        var cxy = this.getc();
    	        //this.get_elm(2).clientWidth
    	        if(p=='auto') {
        	            if(xy.x>cxy.x && xy.y<cxy.y) {//topright ---> bottomleft
            	                this.get_elm(1).style.left=xy.x-this.param.l-this.get_elm(1).offsetWidth+'px';
            	                this.get_elm(1).style.top=xy.y+this.param.t+'px';
            	            }
        	            else if(xy.x>cxy.x && xy.y>cxy.y) {//bottomright ---> topleft
            	                this.get_elm(1).style.left=xy.x-this.param.l-this.get_elm(1).offsetWidth+'px';
            	                this.get_elm(1).style.top=xy.y-this.param.t-this.get_elm(1).offsetHeight+'px';
            	            }
        	            else if(xy.x<cxy.x && xy.y>cxy.y) {//bottomleft ---> topright
            	                this.get_elm(1).style.left=xy.x+this.param.l+'px';
            	                this.get_elm(1).style.top=xy.y-this.param.t-this.get_elm(1).offsetHeight+'px';
            	            }
        	            else if(xy.x<=cxy.x && xy.y<=cxy.y) {//topleft ---> bottomright
            	                this.get_elm(1).style.left=xy.x+this.param.l+'px';
            	                this.get_elm(1).style.top=xy.y+this.param.t+'px';
            	            }
        	        }
    	        else if(p=='topleft' || p=='lefttop') {
        	            this.get_elm(1).style.left=xy.x-this.param.l-this.get_elm(1).offsetWidth+'px';
        	            this.get_elm(1).style.top=xy.y-this.param.t-this.get_elm(1).offsetHeight+'px';
        	        }
    	        else if(p=='topright' || p=='righttop') {
        	            this.get_elm(1).style.left=xy.x+this.param.l+'px';
        	            this.get_elm(1).style.top=xy.y-this.param.t-this.get_elm(1).offsetHeight+'px';
        	        }
    	        else if(p=='bottomleft' || p=='leftbottom') {
        	            this.get_elm(1).style.left=xy.x-this.param.l-this.get_elm(1).offsetWidth+'px';
        	            this.get_elm(1).style.top=xy.y+this.param.t+'px';
        	        }
    	        else if(p=='bottomright' || p=='rightbottom') {
        	            this.get_elm(1).style.left=xy.x+this.param.l+'px';
        	            this.get_elm(1).style.top=xy.y+this.param.t+'px';
        	        }
    	    },
	    onmov: function (e,atr) {
    	        this.noerr();
     	        this.get_elm(1).style.visibility='visible';
    	        this.get_elm(1).style.display='block';
    	        this.settxt(atr);
    	        this.param.alpha=0;
    	        tooltip.show();
    	        this.onmmo(e);
    	    },
	    onmou: function () {
    	        this.noerr();
    	        tooltip.hide();
    	    },
	    settxt: function (atr) {
    	        for(var x in tooltip.param.id_el) {
        	            if(tooltip.param.id_el[x]===atr) {
            	                this.get_elm(2).innerHTML=tooltip.param.id_txt[x];
            	            }
        	        }
    	    },
	    show: function () {
    	        this.get_elm(1).style.opacity=this.param.alpha*.01;
    	        this.get_elm(1).style.filter='alpha(opacity='+this.param.alpha+')';
    	        this.param.alpha=this.param.alpha+this.param.speed_on;
    	        if(this.param.alpha<this.param.alpha_end) {
        	            this.param.get_tiou=setTimeout('tooltip.show();',this.param.timer_on);
        	        }
    	        else {
        	            this.get_elm(1).style.opacity=this.param.alpha_end*.01;
        	            this.get_elm(1).style.filter='alpha(opacity='+this.param.alpha_end+')';
        	            this.param.alpha=this.param.alpha_end;
        	        }
    	    },
	    hide: function () {
    	        this.get_elm(1).style.opacity=this.param.alpha*.01;
    	        this.get_elm(1).style.filter='alpha(opacity='+this.param.alpha+')';
    	        this.param.alpha=this.param.alpha-this.param.speed_off;
    	        if(this.param.alpha>0) {
        	            this.param.get_tiou=setTimeout('tooltip.hide();',this.param.timer_off);
        	        }
    	        else {
        	            this.get_elm(1).style.opacity=this.param.alpha_end*.01;
        	            this.get_elm(1).style.filter='alpha(opacity='+this.param.alpha_end+')';
        	            this.param.alpha=0;
                        this.get_elm(1).style.visibility='hidden';
        	            this.get_elm(1).style.display='none';
        	        }
    	    },
	    noerr: function () {
    	        clearTimeout(this.param.get_tiou);
    	    },
	    getp: function (e) {
    	        var x=0, y=0;
    	        if(!e) {e = window.event;}
    	        if(e.pageX || e.pageY) {
        	            x=e.pageX;
        	            y=e.pageY;
        	        }
    	        else if(e.clientX || e.clientY) {
        	            x=e.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft)-document.documentElement.clientLeft;
        	            y=e.clientY+(document.documentElement.scrollTop || document.body.scrollTop)-document.documentElement.clientTop;
        	        }
    	        return {"x":x, "y":y};
    	    },
	    getc: function () {
    	        function getClientWidth() {
        	            return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
        	        }
    	        function getClientHeight() {
        	            return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
        	        }
    	        function getBodyScrollTop() {
        	            return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
        	        }
    	        function getBodyScrollLeft() {
        	            return self.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft);
        	        }
    	        function getClientCenterX() {
        	            return parseInt(getClientWidth()/2)+getBodyScrollLeft();
        	        }
    	        function getClientCenterY() {
        	            return parseInt(getClientHeight()/2)+getBodyScrollTop();
        	        }
    	        var x=0, y=0;
    	        x=getClientCenterX();
    	        y=getClientCenterY();
    	        return {"x":x, "y":y};
    	    }
	};
