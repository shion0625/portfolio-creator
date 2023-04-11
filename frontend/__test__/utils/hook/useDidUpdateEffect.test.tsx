import React from 'react';
import { render, act } from '@testing-library/react';
import { useDidUpdateEffect } from '~/utils/hook/useDidUpdateEffect';

describe('useDidUpdateEffect', () => {
  it('should skip first effect run', () => {
    const effectCallback = jest.fn();
    const { rerender } = render(
      <TestComponent effectCallback={effectCallback} dependencyValue={1} />,
    );
    expect(effectCallback).not.toHaveBeenCalled();

    rerender(<TestComponent effectCallback={effectCallback} dependencyValue={2} />);
    expect(effectCallback).toHaveBeenCalledTimes(1);
  });
});

type TestComponentProps = {
  effectCallback: () => void;
  dependencyValue: number;
};

const TestComponent: React.FC<TestComponentProps> = ({ effectCallback, dependencyValue }) => {
  useDidUpdateEffect(effectCallback, [dependencyValue]);
  return null;
};
