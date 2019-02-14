<template src="./template.html" />
<script src="./script.js" />
<style src="./style.styl" lang="stylus" />

<!--<template>-->
    <!--<div class="badge"-->
         <!--:class="classes"-->
         <!--v-bind="attributes">-->
        <!--<slot></slot>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';-->
    <!--import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';-->

    <!--import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';-->
    <!--import VariantPropertyMixin from '@inkline/inkline/mixins/components/properties/VariantPropertyMixin';-->

    <!--export default {-->
        <!--name: 'IBadge',-->
        <!--mixins: [-->
            <!--AttributesProviderMixin,-->
            <!--ClassesProviderMixin,-->

            <!--SizePropertyMixin,-->
            <!--VariantPropertyMixin-->
        <!--]-->
    <!--};-->
<!--</script>-->

<!--<style lang="stylus">-->
    <!--/**-->
     <!--* Badge-->
     <!--*/-->

    <!--@import '../../css/config'-->
    <!--@import '../../css/mixins'-->
    <!--@import 'css/_variables'-->
    <!--@import 'css/_variants'-->
    <!--@import 'css/_sizes'-->

    <!--.badge-->
        <!--display: inline-block-->
        <!--font-weight: &#45;&#45;badge-font-weight-->
        <!--line-height: 1-->
        <!--text-align: center-->
        <!--white-space: nowrap-->
        <!--vertical-align: baseline-->

        <!--a:hover &,-->
        <!--a:focus &-->
            <!--text-decoration: none-->

        <!--.button &-->
            <!--position: relative-->
            <!--top: -1px-->

        <!--&.-pill-->
            <!--border-radius: &#45;&#45;badge-pill-border-radius-->

        <!--@extend .badge.-md-->
        <!--@extend .badge.-light-->
<!--</style>-->