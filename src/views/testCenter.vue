<template>
<div class="testCenter">
    <video id="video" controls="controls"></video>
</div>
</template>

<script>
import axios from 'axios'
import pptSlides from '@/components/courseTree/pptSlides'



export default {
  name: 'textCenter',
  data () {
    return {
        lists: [
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片1.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片2.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片3.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片4.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片5.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片6.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片7.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片8.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片9.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片10.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片11.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片12.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片13.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片14.JPG' },
          { img : '../../resource/imgs/coursePPTimg/新能源汽车/纯电动汽车/EV系列-1-1-纯电动汽车基本信息收集与介绍/幻灯片15.JPG' },
        ],
        total:'',//总信息数
        size:1,//每页显示信息个数不传默认6
        page:1,//当前页码
    }
  },
  created(){

  },
  mounted(){
        var video = document.getElementById("video");
        window.URL = window.URL || window.webkitURL;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:8080/resource/video/courseVideoData/拆卸车轮.mp4", true);
        
            xhr.responseType = "blob";
            xhr.onload = function() {
            if (this.status == 200) {
                var blob = this.response;
                video.onload = function(e) {
                    window.URL.revokeObjectURL(video.src);
                };
                video.src = window.URL.createObjectURL(blob);
                }
            }
            xhr.send();
            
//      var video = document.querySelector('video');
//        var assetURL = 'http://127.0.0.1:8080/resource/video/courseVideoData/拆卸车轮.mp4';
//        // Need to be specific for Blink regarding codecs
//        // ./mp4info frag_bunny.mp4 | grep Codec
//        var mimeCodec = 'video/mp4;codecs="avc1.42E01E,mp4a.40.2"';
//
//        if('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
//            var mediaSource = new MediaSource();
//            video.src = URL.createObjectURL(mediaSource);
//            mediaSource.addEventListener('sourceopen', this.sourceOpen(mimeCodec));
//
//        } else {
//            console.error('Unsupported MIME type or codec: ', mimeCodec);
//        }

//        fetch('http://192.168.2.251:80/resource/video/courseVideoData/拆卸车轮.mp4')
//        .then(response => response.blob())
//        .then(response => {
//            const url = URL.createObjectURL(response)
//            video.onload = () => URL.revokeObjectURL(response)
//            video.src = url
//        })
  },
  methods:{
        sourceOpen(val) {
            console.log(this); // open
            console.log(val)
            var mediaSource = this;
            var sourceBuffer = mediaSource.addSourceBuffer(val);
            this.fetchAB(assetURL, function(buf) {
                console.log(buf)
                console.log(sourceBuffer);
                sourceBuffer.addEventListener('updateend', function() {
                    console.log(mediaSource);
                    mediaSource.endOfStream();

                    video.play();
                    console.log(mediaSource.readyState); // ended
                });
                sourceBuffer.appendBuffer(buf);
            });
        },
        fetchAB(url, cb) {
            console.log(url);
            var xhr = new XMLHttpRequest;
            xhr.open('get', url);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function() {
                console.log(xhr.response);
                cb(xhr.response);
            };
            xhr.send();
        }
  },
  watch:{

  },
  components:{pptSlides}
}
</script>

<style scoped>

*{
    margin:0;
    padding:0;
}
</style>
