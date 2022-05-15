<template>
	<div class="module-bar-changelog">
		<v-button v-tooltip.right="`What's news`" class="changelogs" tile icon x-large>
			<v-icon name="new_releases" />
		</v-button>
	</div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';

const HEADWAY_WIDGET_URL = '//cdn.headwayapp.co/widget.js';
const HEADWAY_ACCOUNT_ID = '7wArzy';

export default defineComponent({
	setup() {
		const { t } = useI18n();

		return {
			t,
		};
	},
	mounted() {
		let headwayScript = document.createElement('script');
		headwayScript.async = true;
		headwayScript.setAttribute('src', HEADWAY_WIDGET_URL);
		document.head.appendChild(headwayScript);

		const waitForHeadway = () => {
			if (window['Headway']) {
				window.Headway.init({
					selector: '.changelogs',
					account: HEADWAY_ACCOUNT_ID,
				});
			} else {
				setTimeout(() => waitForHeadway(), 50);
			}
		};

		waitForHeadway();
	},
});
</script>

<style>
#HW_badge_cont {
	position: absolute !important;
	width: 100%;
	height: 100%;
}

#HW_badge {
	top: 8px;
	left: 40px;
}

#HW_frame_cont {
	left: 62px !important;
	top: inherit !important;
	bottom: 120px;
}

.changelogs {
	position: relative !important;
	--v-button-color: var(--module-icon);
	--v-button-color-hover: var(--white);
	--v-button-background-color: var(--module-background);
	--v-button-background-color-hover: var(--module-background);
}
</style>
