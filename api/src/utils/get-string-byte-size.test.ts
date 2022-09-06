import { stringByteSize } from '../../src/utils/get-string-byte-size';

test('Returns correct byte size for given input string', () => {
	expect(stringByteSize('test')).toBe(4);
	expect(stringByteSize('🐡')).toBe(4);
	expect(stringByteSize('👨‍👧‍👦')).toBe(18);
});
