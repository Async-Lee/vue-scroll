class SpiderAnimation {
	constructor() {}
	init (params){
		var random_lines = {}
		params = Object.assign({
			direction: 'left',
			width: 250,
			opacity: 1,
			color: '58, 105, 175',
			count: 50
		}, params)
		var {direction, width, opacity, color, count} = params
		! function() {
			//封装方法，压缩之后减少文件大小
			function get_attribute(node, attr, default_value) {
				return node.getAttribute(attr) || default_value;
			}
			//封装方法，压缩之后减少文件大小
			function get_by_tagname(name) {
				return document.getElementsByTagName(name);
			}
			//获取配置参数
			function get_config_option() {
				var scripts = get_by_tagname("script"),
					script_len = scripts.length,
					script = scripts[script_len - 1]; //当前加载的script
				return {
					l: script_len, //长度，用于生成id用
					z: get_attribute(script, "zIndex", -1), //z-index
					o: get_attribute(script, "opacity", opacity), //opacity
					c: get_attribute(script, "color", color), //color
					n: get_attribute(script, "count", count) //蜘蛛网数量
				};
			}
			//设置canvas的高宽
			function set_canvas_size() {
				canvas_width = the_canvas.width = width // window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 
				canvas_height = the_canvas.height = width //window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			}
			//绘制过程
			function draw_canvas() {
				context.clearRect(0, 0, canvas_width, canvas_height);
				//随机的线条和当前位置联合数组
				var e, i, d, x_dist, y_dist, dist; //临时节点
				//遍历处理每一个点
				random_lines.forEach(function(r, idx) {
					r.x += r.xa
					r.y += r.ya //移动 
					if (direction === 'left') {
						r.xa *= r.x > (width - r.y) || r.x < 0 || r.x > canvas_width ? -1 : 1
						r.ya *= r.x > (width - r.y) || r.y < 0 || r.y > canvas_height ? -1 : 1
					} else {
						r.xa *= r.x < r.y || r.x < 0 || r.x > canvas_width ? -1 : 1
						r.ya *= r.x < r.y || r.y < 0 || r.y > canvas_height ? -1 : 1
					}
					context.fillRect(r.x - 0.5, r.y - 0.5, 2, 2); //绘制一个宽高为1的点
					//从下一个点开始
					for (i = idx + 1; i < all_array.length; i++) {
						e = all_array[i];
						//不是当前点
						if (null !== e.x && null !== e.y) {
								x_dist = r.x - e.x, //x轴距离 l
								y_dist = r.y - e.y, //y轴距离 n
								dist = x_dist * x_dist + y_dist * y_dist; //总距离, m
							dist < e.max && (e === current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
								d = (e.max - dist) / e.max, 
								context.beginPath(), 
								context.lineWidth = d / 2, 
								context.strokeStyle = "rgba(" + config.c + "," + (d + 0.2) + ")",
								context.moveTo(r.x, r.y), 
								context.lineTo(e.x, e.y), 
								context.stroke());
						}
					}
				}), frame_func(draw_canvas);
			}
			//绘制过程
			function draw_canvas1() {
				context.clearRect(0, 0, canvas_width, canvas_height);
				//随机的线条和当前位置联合数组
				var e, i, d, x_dist, y_dist, dist; //临时节点
				//遍历处理每一个点
				random_lines.forEach(function(r, idx) {
					r.x += r.xa
					r.y += r.ya //移动 
					if (direction === 'left') {
						r.xa *= r.x > (width - r.y) || r.x < 0 || r.x > canvas_width ? -1 : 1
						r.ya *= r.x > (width - r.y) || r.y < 0 || r.y > canvas_height ? -1 : 1
					} else {
						r.xa *= r.x < r.y || r.x < 0 || r.x > canvas_width ? -1 : 1
						r.ya *= r.x < r.y || r.y < 0 || r.y > canvas_height ? -1 : 1
					}
					context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //绘制一个宽高为1的点
					//从下一个点开始
					for (i = idx + 1; i < all_array.length; i++) {
						e = all_array[i];
						//不是当前点
						if (null !== e.x && null !== e.y) {
								x_dist = r.x - e.x, //x轴距离 l
								y_dist = r.y - e.y, //y轴距离 n
								dist = x_dist * x_dist + y_dist * y_dist; //总距离, m
							dist < e.max && (e === current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
								d = (e.max - dist) / e.max, 
								context.beginPath(), 
								context.lineWidth = d / 2, 
								context.strokeStyle = "rgba(" + config.c + "," + (d + 0.2) + ")", 
								context.moveTo(r.x, r.y), 
								context.lineTo(e.x, e.y), 
								context.stroke());
						}
					}
					// san()
				}), frame_func(draw_canvas1);
			}
			//创建画布，并添加到body中
			var the_canvas = document.createElement("canvas"), //画布
				config = get_config_option(), //配置
				canvas_id = "c_n" + config.l, //canvas id
				context = the_canvas.getContext("2d"), canvas_width, canvas_height, 
				frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {
					window.setTimeout(func, 1000 / 45);
				}, random = Math.random, 
				current_point = {
					x: null, //当前鼠标x
					y: null, //当前鼠标y
					max: 5000
				},
				all_array;
			the_canvas.id = canvas_id;
			the_canvas.style.cssText = "position:fixed;top:0;" + direction +":0;z-index:" + config.z + ";opacity:" + config.o;
			var div = document.createElement("div")
			div.style.cssText = "width: 250px; height: 250px; position: absolute; " + direction + ": 0; top: 0;"
			console.log(direction)
			div.id = direction === 'left' ? 'can_box1' : 'can_box2'
			div.appendChild(the_canvas);
			get_by_tagname('body')[0].appendChild(div)
			set_canvas_size(), window.onresize = set_canvas_size;
			setTimeout(() => {
				if (direction === 'left') {
					document.getElementById('can_box1').onmousemove = function(e) {
						if ((e.clientX, e.clientY) < width) {
							e = e || window.event, current_point.x = e.clientX, current_point.y = e.clientY;
						} else {
							current_point.x = null, current_point.y = null;	
						}
					}, document.getElementById('can_box1').onmouseout = function() {
						current_point.x = null, current_point.y = null;
					};
				} else {
					document.getElementById('can_box2').onmousemove = function(e) {
						e = e || window.event
						var w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth), h
						w = e.clientX - (w - width)
						h = e.clientY
						if (w < h) {
							current_point.x = null, current_point.y = null;
						} else {
							current_point.x = w, current_point.y = h
						}
					}, document.getElementById('can_box2').onmouseout = function() {
						current_point.x = null, current_point.y = null;
					};
				}
			}, 0)
			//随机生成config.n条线位置信息
			var i
			for (random_lines = [], i = 0; config.n > i; i++) {
				var x = random() * width,
					y = direction === 'left' ? (width - x) * random() : x - x * random(),
					xa = 2 * random() - 1, //随机运动方向
					ya = 2 * random() - 1;
				random_lines.push({
					x: x,
					y: y,
					xa: xa,
					ya: ya,
					max: 4000 //沾附距离
				});
			}
			all_array = random_lines.concat([current_point]);
			//0.1秒后绘制
			setTimeout(function() {
				draw_canvas();
			}, 0);
		}();
	}
}
export default SpiderAnimation