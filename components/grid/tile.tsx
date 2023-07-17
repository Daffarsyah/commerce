import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  labelPosition,
  labels,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  labelPosition?: 'bottom' | 'center';
  labels?: {
    title: string;
    amount: string;
    currencyCode: string;
    isSmall?: boolean;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
        {
          relative: labels,
          'border-2 border-blue-600': active,
          'border-gray-200 dark:border-gray-800': !active
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
      {labels ? (
        <Label
          title={labels.title}
          amount={labels.amount}
          currencyCode={labels.currencyCode}
          size={labels.isSmall ? 'small' : 'large'}
          position={labelPosition}
        />
      ) : null}
    </div>
  );
}
