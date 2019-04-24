<template>
	<view class="content">
		<text class="title">{{ articleInfo.articleTitle }}</text>
		<view class="parent-view">
			<view class="auther-info">{{ articleInfo.articleTime }}</view>
			<view class="auther-info">{{ articleInfo.userName }}</view>
		</view>
		<rich-text type="text" class="article-content" :nodes="articleInfo.articleContent"></rich-text>
	</view>
</template>

<script>
export default {
	data() {
		return {
			articleInfo: ''
		};
	},
	methods: {
		getArticleInfo: function(e) {
			uni.request({
				url: 'http://localhost:8081/photoshare/article/getArticleInfo',
				method: 'POST',
				data: {
					id: e.articleId
				},
				success: res => {
					console.log(res);
					this.articleInfo = res.data.data;
					console.log(this.articleInfo);
				}
			});
		}
	},
	onLoad: function(res) {
		this.getArticleInfo(res);
	}
};
</script>

<style>
.content {
	flex-wrap: wrap;
	padding: 15upx;
}
.title {
	line-height: 100upx;
	font-size: 60upx;
	font-weight: 700;
}
.article-content {
	line-height: 50upx;
	font-size: 30upx;
}
.auther-info {
	line-height: 50upx;
	font-size: 30upx;
	align-self: auto;
	color: #555555;
	margin: 0 0 20upx 0;
}
.parent-view {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>
