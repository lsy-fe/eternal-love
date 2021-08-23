<template>
  <div class="home">
    <div v-if="!show" class="main">
      <div class="flex-ct" data-title="三维立方体">
        <div class="td-cube">
          <ul>
            <li class="front"></li>
            <li class="back"></li>
            <li class="top"></li>
            <li class="bottom"></li>
            <li class="left"></li>
            <li class="right"></li>
          </ul>
        </div>
      </div>
      <div class="heart"><div class="text">I&emsp;❤️&emsp;U</div></div>
      <div class="custom-btn"><i class="flash-across"></i>Eternal love</div>
    </div>
    <div v-if="show" class="bruce flex-ct-x main" data-title="状态悬浮球">
      <div class="state-ball warning">
        <div class="wave"></div>
      </div>
    </div>
    <div class="bruce" data-title="气泡背景墙">
      <ul class="bubble-bgwall">
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed
} from '@vue/composition-api'

export default defineComponent({
  setup () {
    const show = computed(() => {
      return getFiles()
    })

    const getFiles = () => {
      const files = require
        .context('../../../days', true, /.(png|jpg|jpeg)$/)
        .keys()
      const list = [] as Array<string>
      files.forEach(item => {
        const filename = item.split('/')[2]
        list.push(filename.split('-')[0])
      })
      return hasEveryday(list)
    }

    const hasEveryday = (list: Array<string>) => {
      let num = 0
      for (let i = 1; i < 32; i++) {
        list.some(item => +item === i) && num++
      }
      document.documentElement.style.setProperty(
        '--top-height',
        -60 - ((num * 36) / 32) * 10 + 'px'
      )
      document.documentElement.style.setProperty(
        '--second-top-height',
        -70 - ((num * 36) / 32) * 10 + 'px'
      )
      if (num === 31 && list.some(item => item === 'love')) {
        document.documentElement.style.setProperty('--top-height', '-420px')
        document.documentElement.style.setProperty(
          '--second-top-height',
          '-430px'
        )
        return true
      }
      return false
    }

    return {
      show
    }
  }
})
</script>

<style lang="stylus">
:root
  --top-height -420px
  --second-top-height -430px
  --bruce-width 150px
  --bruce-height 150px
  --bruce-length 150px
body
  overflow hidden
  margin 0
.main
  position relative
  z-index 100
.heart
  position relative
  width 500px
  height 450px
  margin 0 auto
  animation-duration 3s
  animation-name heart
  animation-fill-mode forwards
  animation-iteration-count 24
  &:before, &:after
    position absolute
    content ''
    left 250px
    top 0
    width 250px
    height 400px
    background #F00
    border-radius 200px 200px 0 0
    transform rotate(-45deg)
    transform-origin 0 100%
  &:after
    left 0
    transform rotate(45deg)
    transform-origin 100% 100%
.state-ball
  overflow hidden
  position relative
  padding 5px
  border 3px solid #3c9
  border-radius 100%
  width 320px
  height 320px
  background-color #fff
  margin 50% auto
  &::before, &::after
    position absolute
    left 50%
    top 0
    z-index 20
    margin-left -200px
    width 400px
    height 400px
    content ''
  &::before
    margin-top var(--top-height)
    border-radius 45%
    background-color rgba(#fff, 0.5)
    animation rotate 10s linear -5s infinite
  &::after
    margin-top var(--second-top-height)
    border-radius 40%
    background-color rgba(#fff, 0.8)
    animation rotate 15s infinite
  &.warning
    border-color #f66
    .wave
      background-image linear-gradient(-180deg, #FFBEE2 13%, #FF0090 91%)
  &.danger
    border-color #f66
    .wave
      background #F00
  .wave
    position relative
    border-radius 100%
    width 100%
    height 100%
    background-image linear-gradient(-180deg, #af8 13%, #3c9 91%)
@keyframes rotate
  to
    transform rotate(1turn)
.custom-btn
  color #fff
  border-radius 5px
  padding 10px 25px
  font-family 'Lato', sans-serif
  font-weight 500
  cursor pointer
  transition all 0.3s ease
  position relative
  display inline-block
  box-shadow inset 2px 2px 2px 0px rgba(255 255 255 50%), 7px 7px 20px 0px rgba(0 0 0 10%), 4px 4px 5px 0px rgba(0 0 0 10%)
  outline none
  border none
  background linear-gradient(0deg, rgba(251, 33, 117, 1) 0%, rgba(234, 76, 137, 1) 100%)
  overflow hidden
  border-radius 100px
  &::before
    position absolute
    content ''
    display inline-block
    top -180px
    left 0
    width 30px
    height 100%
    background-color #fff
    animation changeImg 3s ease-in-out infinite
  &:hover
    opacity 0.7
    text-decoration none
    color #fff
  &:active
    box-shadow 4px 4px 6px 0 rgba(255 255 255 30%), -4px -4px 6px 0 rgba(116 125 136 20%), inset -4px -4px 6px 0 rgba(255 255 255 20%), inset 4px 4px 6px 0 rgba(0 0 0 20%)
  .flash-across
    position absolute
    transition all 0.3s ease
    animation changeImg 3s ease-in-out infinite
    top 0
    width 30%
    height 100%
    content ''
    background linear-gradient(to right, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)
    transform skewX(-45deg)
@keyframes changeImg
  from
    left -100%
  100%
    left 150%
.bruce
  background-image linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)
  width 100%
  height 100%
  position absolute
  top 0
  z-index 0
.bubble-bgwall
  overflow hidden
  position relative
  margin 0 auto
  width 100%
  max-width 1200px
  height 100%
  li
    display flex
    position absolute
    bottom -200px
    justify-content center
    align-items center
    border-radius 10px
    width 50px
    height 50px
    background-color rgba(#fff, 0.15)
    color #ccc
    animation bubble 15s infinite
    &:nth-child(1)
      left 10%
    &:nth-child(2)
      left 20%
      width 90px
      height 90px
      animation-duration 7s
      animation-delay 2s
    &:nth-child(3)
      left 25%
      animation-delay 4s
    &:nth-child(4)
      left 40%
      width 60px
      height 60px
      background-color rgba(#fff, 0.3)
      animation-duration 8s
    &:nth-child(5)
      left 70%
    &:nth-child(6)
      left 80%
      width 120px
      height 120px
      background-color rgba(#fff, 0.2)
      animation-delay 3s
    &:nth-child(7)
      left 32%
      width 160px
      height 160px
      animation-delay 2s
    &:nth-child(8)
      left 55%
      width 40px
      height 40px
      font-size 12px
      animation-duration 15s
      animation-delay 4s
    &:nth-child(9)
      left 25%
      width 40px
      height 40px
      background-color rgba(#fff, 0.3)
      font-size 12px
      animation-duration 12s
      animation-delay 2s
    &:nth-child(10)
      left 85%
      width 160px
      height 160px
      animation-delay 5s
@keyframes bubble
  0%
    opacity 0.5
    transform translateY(0) rotate(45deg)
  25%
    opacity 0.75
    transform translateY(-400px) rotate(90deg)
  50%
    opacity 1
    transform translateY(-600px) rotate(135deg)
  100%
    opacity 0
    transform translateY(-1000px) rotate(180deg)
.flex-ct
  margin 40px
.td-cube
  width var(--bruce-width)
  height var(--bruce-height)
  perspective 1000px
  ul
    position relative
    width 100%
    height 100%
    transform rotateX(-15deg) rotateY(15deg)
    transform-style preserve-3d
    animation rotate 5s infinite linear
  li
    display flex
    position absolute
    justify-content center
    align-items center
    width var(--bruce-width)
    height var(--bruce-height)
    opacity 0.8
    font-size 50px
    color #fff
    &.front
      background url('~@/assets/2-4-21-1.jpg') center center / cover no-repeat
      transform translateZ(calc((var(--bruce-height) / 2)))
    &.back
      background url('~@/assets/4-4-21-2.jpg') center center / cover no-repeat
      transform rotateY(180deg) translateZ(calc((var(--bruce-height) / 2)))
    &.top
      background url('~@/assets/5-6-21-8.jpg') center center / cover no-repeat
      transform rotateX(90deg) translateZ(calc((var(--bruce-height) / 2)))
    &.bottom
      background url('~@/assets/10-7-21-2.jpg') center center / cover no-repeat
      transform rotateX(-90deg) translateZ(calc((var(--bruce-height) / 2)))
    &.left
      background url('~@/assets/13-7-21-2.jpg') center center / cover no-repeat
      transform rotateY(-90deg) translateZ(calc((var(--bruce-width) / 2)))
    &.right
      background url('~@/assets/28-3-21-2.jpg') center center / cover no-repeat
      transform rotateY(90deg) translateZ(calc((var(--bruce-width) / 2)))
@keyframes rotate
  from
    transform rotateY(0) rotateX(0)
  to
    transform rotateY(-1turn) rotateX(-1turn)
.text
  position relative
  font-size 50px
  color #fff
  top 120px
  transform rotate(-45deg)
  animation-name words
  animation-duration 3s
  z-index 1
  opacity 0
  animation-fill-mode forwards
  animation-iteration-count 24
@keyframes heart
  25%
    transform scale(1)
  50%
    transform scale(0.5)
  75%
    transform scale(1)
  85%
    transform scale(0.5)
  100%
    transform scale(1)
@keyframes words
  100%
    transform rotate(360deg)
    opacity 0.8
</style>
