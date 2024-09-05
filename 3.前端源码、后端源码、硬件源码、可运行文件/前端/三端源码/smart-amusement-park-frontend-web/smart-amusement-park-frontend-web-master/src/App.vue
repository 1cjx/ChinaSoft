<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script type="text/javascript">
  window._AMapSecurityConfig = {
    securityJsCode: 'f99d166075840e06818144db8151a707 ',
  }
</script>
<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=2.0&key=f99d166075840e06818144db8151a707&plugin=AMap.Geolocation,AMap.Autocomplete,AMap.PlaceSearch,AMap.Scale,AMap.OverView,AMap.ToolBar,AMap.MapType,AMap.PolyEditor,AMap.CircleEditor,AMap.MarkerClusterer,AMap.DistrictLayer,AMap.Heatmap,AMap.DistrictSearch,AMap.Object3DLayer"
>
</script>
<script src="https://webapi.amap.com/ui/1.1/main.js"></script>
<script src="//a.amap.com/jsapi_demos/static/resource/heatmapData.js"></script>

<script>
export default {
  name: 'App'
}
</script>
