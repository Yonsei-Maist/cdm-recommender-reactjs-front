/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.18
 */
import {
    addMarkTag,
    addMarkTagWithOnClickHandler,
    removeLastMarkTag,
    removeMarkTag,
} from './helpers';

describe('test method addMarkTag', () => {
    it('should add mark tag with the given list of keywords ', () => {
        const keywords = ['cold', 'patient'];
        const text = 'In my opinion, this patient have cold and .....';
        const markedText = addMarkTag(text, keywords);
        const expectMarkedText = `In my opinion, this <mark onclick="alert('patient')">patient</mark> have <mark onclick="alert('cold')">cold</mark> and .....`;
        expect(markedText).toBe(expectMarkedText);
    });
});

describe('test method addMarkTagWithOnClickHandler', () => {
    it('should add mark tag with the given list of keywords ', () => {
        const keywords = ['cold', 'patient'];
        const text = 'In my opinion, this patient have cold and .....';
        const markedText = addMarkTagWithOnClickHandler(
            text,
            keywords,
            'alert'
        );
        const expectMarkedText = `In my opinion, this <mark onclick="alert('patient')">patient</mark> have <mark onclick="alert('cold')">cold</mark> and .....`;
        expect(markedText).toBe(expectMarkedText);
    });
});

describe('test method removeMarkTag', () => {
    it('should remove mark tag with the given list of keywords ', () => {
        const text = `In my opinion, this <mark onclick="alert('patient')">patient</mark> have <mark onclick="alert('cold')">cold</mark> and .....`;
        const removeMarkTagText = removeMarkTag(text);
        const expectRemoveMarkTagText =
            'In my opinion, this patient have cold and .....';
        expect(removeMarkTagText).toBe(expectRemoveMarkTagText);
    });
});

describe('test method removeLastMarkTag', () => {
    it('should remove mark tag with the given list of keywords ', () => {
        const text = `In my opinion, this <mark onclick="alert('patient')">patient</mark> have <mark onclick="alert('cold')">cold</mark> and .....`;
        const removeMarkTagText = removeLastMarkTag(text);
        const expectRemoveMarkTagText = `In my opinion, this <mark onclick="alert('patient')">patient</mark> have cold and .....`;
        expect(removeMarkTagText).toBe(expectRemoveMarkTagText);
    });
});
