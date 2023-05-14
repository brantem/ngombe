import { cn } from 'lib/helpers';

type FooterProps = React.ComponentPropsWithoutRef<'div'> & {
  isBackground?: boolean;
};

const Footer = ({ isBackground, className, ...props }: FooterProps) => {
  return (
    <footer className={cn('flex items-end justify-center pb-12', className)} {...props}>
      <button
        className={cn(
          'px-5 py-2 rounded-full text-2xl font-bold flex items-center',
          isBackground ? 'bg-neutral-100 text-neutral-500' : 'bg-white text-teal-500'
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" fill="currentColor">
          <path d="M276 991q-35.328 0-61.539-22.93Q188.25 945.141 185 910l-82-750h756l-84 750q-3.25 35.141-29.461 58.07Q719.328 991 684 991H276Zm417-177H268l9 86h406l10-86ZM206 251l51.409 471H702.32L756 251H206Zm477 649H277h406Z" />
        </svg>

        <span>Drink</span>
      </button>
    </footer>
  );
};

export default Footer;
