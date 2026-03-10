import type { SVGWrapperProps } from './SVGWrapper';
import SVGWrapper from './SVGWrapper';

export type TwitchProps = SVGWrapperProps;

export default function Twitch(props: TwitchProps) {
  return (
    <SVGWrapper
      viewBox='-2 -2 36 36'
      {...props}
    >
      <path d='M3 0 0 5v23h8v4h4l4-4h5l9-9V0H3zm23 17-5 5h-5l-4 4v-4H6V4h20v13z' />
      <path d='M19 8h3v8h-3V8zm-6 0h3v8h-3V8z' />
    </SVGWrapper>
  );
}
