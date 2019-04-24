<template>
	<view class="content">
		<view class="image-item" v-for="(item, index) in homeList" :key="item.id" @tap="tapInfo" :data-article-id="item.id">
			<view class="image-content">
				<image style="background-color: #eeeeee; height: 400upx;" mode="aspectFill" :src="item.articleCover"></image>
				<view class="image-title">{{ item.articleTitle }}</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				},
				fail: () => {},
				complete: () => {}
			});
		},
		tapInfo(e) {
			var id = e.currentTarget.dataset.articleId;
			console.log(id)
			console.log(e)
			uni.navigateTo({
				url: '../crticle-info/crticle-info?articleId=' + id,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style>
.content {
	text-align: center;
	width: 100%;
	height: auto;
	background-color: #eeeeee;
}
.image-title {
	font-size: 40upx;
}
.image-content {
	padding: 20upx 0 0 0;
}
.image-item {
	background-color: white;
	border-radius: 5px 5px 5px 5px;
	box-shadow: #dad8d8 3px 3px 5px;
	margin: 0 20upx 40upx 20upx;
}
</style>
