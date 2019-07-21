<template>
	<div id="app" @click="play">
		<router-view></router-view>
		<audio
			src="http://111.231.72.88:8081/static/image/video/backmusic.mp3"
			preload
			loop
			autoplay
			ref="music"
			controls
			@click="play"
			style="opacity: 0"
		></audio>
	</div>
</template>
<script>
export default {
	directives: {
		trigger: {
			// 指令的定义
			inserted: function (el) {
				el.click()
			}
		}
	},
	mounted () {
		document.getElementById('app').click()
	},
	methods: {
		play () {
			this.$refs.music.play()
		}
	}
}
</script>