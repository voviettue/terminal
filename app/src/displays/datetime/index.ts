import localizedFormat from '@/utils/localized-format';
import localizedFormatDistance from '@/utils/localized-format-distance';
import { defineDisplay } from '@directus/shared/utils';
import { parse, parseISO } from 'date-fns';
import { i18n } from '@/lang';
import DisplayDateTime from './datetime.vue';

export default defineDisplay({
	id: 'datetime',
	name: '$t:displays.datetime.datetime',
	description: '$t:displays.datetime.description',
	icon: 'query_builder',
	component: DisplayDateTime,
	handler: async (value, options, { field }) => {
		if (!value) return value;

		const relativeFormat = (value: Date) =>
			localizedFormatDistance(value, new Date(), {
				addSuffix: true,
			});

		if (field?.type === 'timestamp') {
			value = parseISO(value);
		} else if (field?.type === 'dateTime') {
			value = parse(value, "yyyy-MM-dd'T'HH:mm:ss", new Date());
		} else if (field?.type === 'date') {
			value = parse(value, 'yyyy-MM-dd', new Date());
		} else if (field?.type === 'time') {
			value = parse(value, 'HH:mm:ss', new Date());
		}

		if (options.relative) {
			return await relativeFormat(value);
		} else {
			let format;

			if (options?.format === 'long') {
				format = `${i18n.global.t('date-fns_date')} ${i18n.global.t('date-fns_time')}`;
				if (field?.type === 'date') format = String(i18n.global.t('date-fns_date'));
				if (field?.type === 'time') format = String(i18n.global.t('date-fns_time'));
			} else if (options?.format === 'short') {
				format = `${i18n.global.t('date-fns_date_short')} ${i18n.global.t('date-fns_time_short')}`;
				if (field?.type === 'date') format = String(i18n.global.t('date-fns_date_short'));
				if (field?.type === 'time') format = String(i18n.global.t('date-fns_time_short'));
			} else {
				format = options?.format;
			}

			return await localizedFormat(value, format);
		}
	},
	options: [
		{
			field: 'format',
			name: '$t:displays.datetime.format',
			type: 'string',
			meta: {
				interface: 'select-dropdown',
				width: 'half',
				options: {
					choices: [
						{ text: '$t:displays.datetime.long', value: 'long' },
						{ text: '$t:displays.datetime.short', value: 'short' },
					],
					allowOther: true,
				},
				note: '$t:displays.datetime.format_note',
			},
			schema: {
				default_value: 'long',
			},
		},
		{
			field: 'relative',
			name: '$t:displays.datetime.relative',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'boolean',
				options: {
					label: '$t:displays.datetime.relative_label',
				},
			},
			schema: {
				default_value: false,
			},
		},
	],
	types: ['dateTime', 'date', 'time', 'timestamp'],
});
