<template>
	<div class="in-address-select">
		<div>
			<ul>
				<li v-for="(item, index) in selectList">
					{{item.provName + item.cityName + item.distName}}
				</li>
			</ul>
		</div>
		<button class="btn btn-danger">选择区域</button>
		<div id="area-select-box2" style="position: relative; width: 400px; display: inline-block;">
			<div class="jarea-select-box" style="">
				<ul class="tab-ul">
					<li :class="`tab-item ${tabIndex === 0 ? 'active' : ''}`" v-if="tabIndex > -1">
						<a href="javascript:;" @click="tabHandle(0)">{{provId ? prov[provId] : '请选择'}}</a>
					</li>
					<li :class="`tab-item ${tabIndex === 1 ? 'active' : ''}`" v-if="tabIndex > 0">
						<a href="javascript:;" @click="tabHandle(1)">{{cityId ? city[provId].filter(item => item.id === cityId)[0].name : '请选择'}}</a>
					</li>
					<li :class="`tab-item ${tabIndex === 2 ? 'active' : ''}`" v-if="tabIndex > 1">
						<a href="javascript:;" @click="tabHandle(2)">{{distId ? dist[cityId].filter(item => item.id === distId)[0].name : '请选择'}}</a>
					</li>
				</ul>
				<div class="tab-content">
					<div class="tab-panel tab-pro" v-if="tabIndex === 0">
						<ul>
							<li v-for="(item, index) in prov" :key="index" @click="provHandle(item, index)" :class="item.id === provId ? 'active' : ''" :data="index">
								<a href="javascript:;">{{item}}</a>
							</li>
						</ul>
					</div>
					<div class="tab-panel tab-city" v-if="tabIndex === 1">
						<ul>
							<li v-for="(item, index) in city[provId]" :key="index" @click="cityHandle(item)" :class="item.id === cityId ? 'active' : ''" :data="item.id">
								<a href="javascript:;">{{item.name}}</a>
							</li>
						</ul>
					</div>
					<div class="tab-panel tab-dist"  v-if="tabIndex === 2">
						<ul>
							<li v-for="(item, index) in dist[cityId]" :key="index" @click="distHandle(item)" :class="distIdArr.includes(item.id) ? 'active' : ''" :data="item.id">
								<a href="javascript:;">{{item.name}}</a>
							</li>
						</ul>
					</div>
				</div>
				<a href="#" class="close-btn">x</a>
			</div>
		</div>
	</div>
</template>
<script>
	import data from './../assets/address.js'
	console.log(data)
	export default {
		name: 'addressTest',
		data () {
			return {
				prov: data.prov,
				city: data.city,
				dist: data.dist,
				provId: 0,
				provName: '',
				cityId: 0,
				cityName: '',
				distId: 0,
				distName: '',
				selectList: [],
				distIdArr: [],
				tabIndex: 0
			}
		},
		methods: {
			tabHandle (index) {
				this.tabIndex = index
				switch (index) {
					case 0:
						this.cityId = this.distId = 0
						this.cityName = ''
						break;
					case 1:
						this.distId = 0
						break;
					default:
						this.provId = this.cityId = this.distId = 0
						this.provName = cityName = ''
						break;
				}
			},
			provHandle (name, id) {
				this.provId = id
				this.provName = name
				this.tabIndex++
			},
			cityHandle (item) {
				this.cityId = item.id
				this.cityName = item.name
				this.tabIndex++
			},
			distHandle (item) {
				let {id, name} = item,
					arr = this.distIdArr,
					list = this.selectList
				this.distId = id
				this.distName = name
				if (arr.includes(id)) {
					arr.splice(arr.indexOf(id), 1)
					let index = list.findIndex(item => item.distId === id)
					list.splice(index, 1)
				} else {
					this.distIdArr.push(id)	
					this.selectList.push({
						provId: this.provId,
						cityId: this.cityId,
						distId: this.distId,
						provName: this.provName,
						cityName: this.cityName,
						distName: this.distName
					})
				}
				console.log(this.selectList)
			}
		}
	}
</script>
<style>#f1c900
	.jarea-select-box {
  		border: 1px solid #dddddd;
  		padding: 10px;
  		background:#FFFFFF;
  		position: absolute;
  	}
  	.jarea-select-box a {
    	font: 700 15px/30px 'microsoft yahei';
    	color: #000;
	}
  	.jarea-select-box .tab-ul {
	  	text-align: left;
	    padding: 0;
	    margin: 0;
	    clear: both;
	    word-spacing: 0px;
	    font-size: 0;
	}
    .jarea-select-box .tab-ul .tab-item {
      	list-style: none;
		display: inline-block;
		padding: 0px 5px;
		margin: 0px 2px;
		border: 1px solid #dddddd;
		border-bottom: none;
	}
 	.jarea-select-box .tab-ul .tab-item a {
 		text-decoration: none;
 	}
    .jarea-select-box .tab-ul .tab-item.active {
		border: 2px solid #f1c900;
		border-bottom: none;
		position: relative;
		top: 2px;
		background-color: #ffffff;
		z-index: 10;
  	}
	.jarea-select-box .tab-ul .tab-item.active a {
	    color: #000000;
	}
  .jarea-select-box .tab-content {
	    border-top: 2px solid #f1c900;
    	/*width: 400px;*/
	}
    .jarea-select-box .tab-content .tab-panel ul {
		margin: 0;
		padding: 5px 0px;
		overflow: hidden;
		clear: both;
  	}
    .jarea-select-box .tab-content .tab-panel ul li {
        list-style: none;
        float: left;
        padding: 1px 5px;
    }
	.jarea-select-box .tab-content .tab-panel ul li.active a {
        background-color: #f1c900;
        color: #ffffff; 
    }
    .jarea-select-box .tab-content .tab-panel ul li a {
        font: 14px/150% Arial,Verdana,"\5b8b\4f53";
		text-decoration: none;
		display: inline-block;
		padding: 2px 5px;
	}
	.jarea-select-box .tab-content .tab-panel ul li a:hover {
	    background-color: #f1c900;
	    color: #ffffff;
	}
    .jarea-select-box .tab-content .active {
    	display: block;
    }
  	.jarea-select-box .close-btn {
	    position: absolute;
	    right: 10px;
	    top: 10px;
	    width: 25px;
	    text-align: center;
	    background-color: #F1F1F1;
	    height: 25px;
	    line-height: 22px;
	    border-radius: 25px;
	    font-size: 16px;
	    color: #333333;
	}
    .jarea-select-box .close-btn:hover {
    	text-decoration: none;
    	background-color: #e1e1e1;
    }
</style>