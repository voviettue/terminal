<template>
	<div v-if="type && !imgError" class="file-preview" :class="{ modal: inModal, small: isSmall, svg: isSVG }">
		<div v-if="type === 'image'" class="image" @click="$emit('click')">
			<v-image :src="authenticatedSrc" :width="width" :height="height" :alt="title" @error="imgError = true" />
		</div>

		<div v-else-if="type === 'video'" class="video">
			<video controls :src="authenticatedSrc" />
		</div>

		<audio v-else-if="type === 'audio'" controls :src="authenticatedSrc" />

		<div v-else-if="type === 'pdf'" class="pdf-viewer">
			<iframe :src="authenticatedSrc" frameborder="0"></iframe>
		</div>

		<div v-else class="fallback">
			<v-icon-file :ext="type" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { readableMimeType } from '@/utils/readable-mime-type';
import { addTokenToURL } from '@/api';
import { getRootPath } from '@/utils/get-root-path';

interface Props {
	mime: string;
	width?: number;
	height?: number;
	src: string;
	title: string;
	inModal?: boolean;
}
defineEmits(['click']);
const props = withDefaults(defineProps<Props>(), { width: undefined, height: undefined, inModal: false });
const imgError = ref(false);
const type = computed<'image' | 'video' | 'audio' | 'pdf' | null>(() => {
	if (props.mime === null) return 'unknown';

	if (props.mime.startsWith('image')) {
		return 'image';
	}
	if (props.mime.startsWith('video')) {
		return 'video';
	}
	if (props.mime.startsWith('audio')) {
		return 'audio';
	}
	if (props.mime.includes('pdf')) {
		return 'pdf';
	}

	return readableMimeType(props.mime, true) ?? 'unknown';
});
const isSVG = computed(() => props.mime.includes('svg'));
const maxHeight = computed(() => Math.min(props.height ?? 528, 528) + 'px');
const isSmall = computed(() => props.height < 528);

const authenticatedSrc = computed(() => addTokenToURL(getRootPath() + props.src));
</script>

<style lang="scss" scoped>
.file-preview {
	position: relative;
	max-width: calc((var(--form-column-max-width) * 2) + var(--form-horizontal-gap));

	img,
	video {
		width: auto;
		height: auto;
	}

	audio {
		width: 100%;
	}

	img,
	video,
	audio {
		max-width: 100%;
		max-height: v-bind(maxHeight);
		object-fit: contain;
		border-radius: var(--border-radius);
	}

	.image,
	.video {
		background-color: var(--background-normal);
		border-radius: var(--border-radius);
	}

	.image {
		img {
			z-index: 1;
			display: block;
			margin: 0 auto;
		}
	}

	.video {
		display: flex;
		justify-content: center;

		video {
			min-height: 80px;
			min-width: 80px;
		}
	}

	.fallback {
		background-color: var(--background-normal);
		display: flex;
		align-items: center;
		justify-content: center;
		height: var(--input-height-tall);
		border-radius: var(--border-radius);
	}

	&.svg,
	&.small {
		.image {
			padding: 64px;
		}
	}

	&.modal {
		.image {
			background-color: transparent;
			border-radius: 0;
		}
	}
}

.svg {
	padding: 64px;
	background-color: var(--background-normal);
	border-radius: var(--border-radius);

	&.max-size img {
		// Max height - padding * 2
		max-height: calc(75vh - 128px);
	}
}

.pdf-viewer {
	width: 100%;
	position: relative;

	&:before {
		content: '';
		display: block;
		padding-top: calc(100% / (1 / 1.4142)); // A4 aspect ratio
	}

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}
</style>
