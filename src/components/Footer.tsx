import { cn } from 'lib/helpers';
import { useModal } from 'lib/hooks';

type RecordsButtonProps = {
  isBackground?: boolean;
};

const RecordsButton = ({ isBackground }: RecordsButtonProps) => {
  const modal = useModal('records');

  return (
    <button
      className={cn(
        'h-9 w-9 flex items-center justify-center rounded-full border shadow-sm',
        /* c8 ignore next 3 */
        isBackground
          ? 'bg-neutral-100 border-neutral-200 text-neutral-500'
          : 'bg-white border-neutral-100 text-cyan-500',
      )}
      onClick={() => modal.show()}
      data-testid="footer-records"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path
          fillRule="evenodd"
          d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM1.99 4.75a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 15.25a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 10a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1V10z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

type DrinkButtonProps = {
  isBackground?: boolean;
};

const DrinkButton = ({ isBackground }: DrinkButtonProps) => {
  const modal = useModal('drink');

  return (
    <button
      className={cn(
        'px-5 py-2 rounded-full text-2xl font-bold flex items-center border shadow-sm',
        /* c8 ignore next 3 */
        isBackground
          ? 'bg-neutral-100 border-neutral-200 text-neutral-500'
          : 'bg-white border-neutral-100 text-cyan-500',
      )}
      onClick={() => modal.show({ hideTime: true })}
      data-testid="footer-drink"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" fill="currentColor">
        <path d="M276 991q-35.328 0-61.539-22.93Q188.25 945.141 185 910l-82-750h756l-84 750q-3.25 35.141-29.461 58.07Q719.328 991 684 991H276Zm417-177H268l9 86h406l10-86ZM206 251l51.409 471H702.32L756 251H206Zm477 649H277h406Z" />
      </svg>
      <span>Drink</span>
    </button>
  );
};

type FooterProps = React.ComponentPropsWithoutRef<'div'> & {
  isBackground?: boolean;
};

const Footer = ({ isBackground, className, ...props }: FooterProps) => {
  return (
    <footer className={cn('flex items-end justify-center pb-12', className)} {...props}>
      <div className="flex items-center space-x-3 mr-[calc(theme(spacing.9)+theme(spacing.2))]">
        <RecordsButton isBackground={isBackground} />

        <DrinkButton isBackground={isBackground} />
      </div>
    </footer>
  );
};

export default Footer;
