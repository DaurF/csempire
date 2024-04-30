<template>
  <footer class="bg-[#16181F] py-14.5 mb-6">
    <div class="content-container grid grid-cols-4 gap-y-8 gap-x-8">
      <Logo class="h-7 col-span-2"/>
      <h6 class="text-white font-semibold">About</h6>
      <h6 class="text-white font-semibold">Community</h6>
      <p class="text-xs font-light leading-5 tracking-wide col-span-2">
        CSGOEmpire is operated by Moonrail Limited B.V., Korporaalweg 10, Curaçao (Company Registration No. 148182). A
        company licensed and regulated by the laws of Curaçao under license number 8048/JAZ.<br><br>
        Payments may be handled on behalf of Moonrail Limited B.V. by JHOLT LTD, Voukourestiou, 25, NEPTUNE HOUSE, 1st
        floor, Flat/Office 11, 3045, Limassol, Cyprus (Company Registration No. HE393291) as per the agreement between
        the two companies.
      </p>
      <ul class="text-sm flex flex-col gap-2.5">
        <li>
          <router-link class="hover:text-[#DCDCDC] transition-all" to="/">About</router-link>
        </li>
        <li>
          <router-link class="hover:text-[#DCDCDC] transition-all" to="/">Careers</router-link>
        </li>
        <li>
          <router-link class="hover:text-[#DCDCDC] transition-all" to="/">Fairness</router-link>
        </li>
        <li>
          <router-link class="hover:text-[#DCDCDC] transition-all" to="/">Privacy Policy</router-link>
        </li>
        <li>
          <router-link class="hover:text-[#DCDCDC] transition-all" to="/">Terms of Service</router-link>
        </li>
        <li>
          <router-link class="hover:text-[#DCDCDC] transition-all" to="/">Official Mirror List</router-link>
        </li>
      </ul>
      <div class="flex gap-1.5">
        <a href="/" target="_blank">
          <Discord/>
        </a>
        <a href="/" target="_blank">
          <Twitter/>
        </a>
      </div>
      <p class="col-span-2 font-light text-xs">
        Copyright © 2016 - 2024 csgoempire.com. All rights reserved.
      </p>
      <div class="col-span-2 flex items-center gap-3.5">
        <Trustpilot class="h-7"/>
        <Visa class="h-5 text-[#4E5058]"/>
        <MasterCard class="h-6 text-[#4E5058]"/>
        <OverEighteen class="h-7 text-[#4E5058]"/>
        <img class="h-8" src="@/shared/ui/assets/images/antillephone-verified.png" alt="Antillephone Verified picture">
        <img class="h-8" src="@/shared/ui/assets/images/xnet-validated.png" alt="Xnet validated picture">
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Logo from "@/shared/ui/icons/logo/AppLogo.vue";
import Discord from "@/shared/ui/icons/discord/AppDiscord.vue";
import Twitter from "@/shared/ui/icons/twitter/AppTwitter.vue";
import Trustpilot from "@/shared/ui/icons/trustpilot/AppTrustpilot.vue";
import Visa from "@/shared/ui/icons/visa/AppVisa.vue";
import MasterCard from "@/shared/ui/icons/master-card/AppMasterCard.vue";
import OverEighteen from "@/shared/ui/icons/over-eighteen/OverEighteen.vue";
</script>

<style scoped>

.content-container {
  margin: 0 auto;
  max-width: 53rem;
}
</style>
