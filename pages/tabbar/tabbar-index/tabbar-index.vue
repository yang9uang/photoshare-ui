<template>
	<view class="content">
		<!-- 列表展示 -->
		<view class="info-item" v-for="(item, index) in homeList" :key="item.id" @tap="tapInfo" :data-article-id="item.id">
			<!-- 左边基本文字信息显示区域 -->
			<!-- 赞评显示区  作者时间显示区 -->
			<view class="info-title">
				<view class="info-child" style="margin-bottom: 10upx;">
				<!-- <view style="text-align:center;background-color: #E96900;font-size: 30upx;width: 62upx;border-radius: 5upx 5upx 5upx 5upx;">默认</view> -->
				{{ item.articleTitle }}
				</view>
				<view lass="info-like">
					<text class="info-like-text">{{ item.userName }} · {{ item.articleTime }}</text>
					<text class="info-like-text">点赞{{ item.articleLike != null ? item.articleLike : 0 }}</text>
					<text class="info-like-text">评论{{ item.articleContent != null ? item.articleContent : 0 }}</text>
				</view>
			</view>
			<!-- 右边图片显示区域 -->
			<view class="info-child" v-show="item.articleCover != null">
				<image style="background-color: #eeeeee; height: 100upx;width: 100upx; margin: 10upx;" mode="aspectFill" :src="item.articleCover"></image>
			</view>
		</view>
	</view>
</template>

<script>
import { utils } from '../../../common/utils.js';
export default {
	data() {
		return {
			homeList: []
		};
	},
	onLoad() {
		this.getHomeInfo();
	},
	methods: {
		getHomeInfo() {
			uni.request({
				url: 'http://localhost:8081/photoshare/article/list',
				method: 'GET',
				data: {},
				success: res => {
					this.homeList = res.data.data;
					this.homeList.forEach(item => {
						item.articleTime = this.beautify_time(item.articleTime);
					});
				},
				fail: () => {},
				complete: () => {}
			});
		},
		tapInfo(e) {
			var id = e.currentTarget.dataset.articleId;
			console.log(id);
			console.log(e);
			uni.navigateTo({
				url: '../crticle-info/crticle-info?articleId=' + id,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		// 日期间隔显示
		beautify_time(timestamp) {
			timestamp = new Date(timestamp).valueOf();
			var mistiming = Math.round((Date.now() - timestamp) / 1000);
			var arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
			var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
			for (var i = 0; i < arrn.length; i++) {
				var inm = Math.floor(mistiming / arrn[i]);
				if (inm != 0) {
					return inm + arrr[i] + '前';
				}
			}
		}
	}
};
</script>

<style>
page {
	background-color: #f8f8f8;
}
.content {
	text-align: center;
	width: 100%;
	padding: 30upx 0 0 0;
	height: auto;
}
.info-title {
	font-size: 30upx;
	font-weight: 300;
	margin: 10upx;
	display: flex;
	flex-direction: column;
	text-align: justify;
}
.info-like {
	margin: 10upx;
	display: flex;
	flex-direction: row;
}
.image-content {
	padding: 20upx 0 0 0;
}
.info-item {
	background-color: white;
	/* border-radius: 5px 5px 5px 5px; */
	box-shadow: #dad8d8 3px 3px 5px;
	margin: 0 20upx 30upx 20upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.info-child {
	align-self: end;
}
.comment-like {
	height: 40upx;
	width: 40upx;
	margin: 0 0 0 10upx;
}
.info-like-text {
	font-size: 25upx;
	color: #555555;
	margin: 10upx;
	float: left;
}
</style>
