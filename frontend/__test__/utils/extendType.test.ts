import { Weaken } from '~/utils/extendType'

describe('Weaken', () => {
  type TestType = {
    a: string;
    b: number;
    c: boolean;
  }

  type WeakenedTestType = Weaken<TestType, 'a' | 'b'>;

  it('should return a type with weakened properties', () => {
    // 引数で指定したプロパティの型が `any` になっているかどうかをテスト
    const obj: WeakenedTestType = { a: 1, b: 'test', c: true };
    expect(typeof obj.a).toEqual('number');
    expect(typeof obj.b).toEqual('string');
    expect(typeof obj.c).toEqual('boolean');
  });

  it('should not weaken properties that were not specified', () => {
    // 引数で指定しなかったプロパティが、元の型と同じ型であるかどうかをテスト
    const obj: WeakenedTestType = { a: 'test', b: 123, c: true };
    expect(typeof obj.c).toEqual('boolean');
  });
});
