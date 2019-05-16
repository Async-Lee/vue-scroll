<template>
	<div class="wrapper">
		<ul>
			<li v-for="(item, index) in box" :key="index" @click="scrollHandle(item.id)">
				<a href="javascript:;">{{`menu${item.id}`}}</a>
			</li>
		</ul>
		<div v-for="(item, index) in box" :key="index"
			:ref="`box${item.id}`"
			style="height: 400px; background: #666; margin: 10px;">
		</div>
	</div>
</template>
<script>
	export default {
		name: 'scrollTest',
		data () {
			return {
				box: [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}],
				isScroll: false
			}
		},
		methods: {
			scrollHandle (id) {
				let el = this.$refs[`box${id}`][0]
				let top = el.offsetTop,
					scrollTop = document.documentElement.scrollTop
				this.scrollAnimation(top, scrollTop)
			},
			// 滚动动画
			scrollAnimation (top, scrollTop){
				if (scrollTop === top || this.isScroll) return
	        	let speed = (top - scrollTop) / 50
	        	let i = 0
		    	let timer = setInterval(()=>{
		        	this.isScroll = true
		        	window.scroll(0, scrollTop += speed)
		        	if (++i === 50) {
		        		this.isScroll = false
		        		clearInterval(timer)
					}
				}, 5)
		    }
		}
	}
</script>
<style>
	ul {		
		position: fixed;
		left: 10px;
		top: 10px;
		font-size: 30px;
		list-style: none;
	}
	a {text-decoration: none; color: black;}
</style>

