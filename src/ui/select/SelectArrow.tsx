import { FunctionComponent } from "react";

interface Props {
  className: string,
  arrowClassName: string,
}

export const SelectArrow: FunctionComponent<Props> = ({ className, arrowClassName }) => {
  return (<>
      <svg className={className} width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
           viewBox="0 0 32 32">

        <path d="M12,30.3h8c7.2,0,10.3-3.1,10.3-10.3v-8c0-7.2-3.1-10.3-10.3-10.3h-8C4.8,1.7,1.7,4.8,1.7,12v8
	C1.7,27.2,4.8,30.3,12,30.3z M3.7,12c0-6.1,2.2-8.3,8.3-8.3h8c6.1,0,8.3,2.2,8.3,8.3v8c0,6.1-2.2,8.3-8.3,8.3h-8
	c-6.1,0-8.3-2.2-8.3-8.3V12z" fill='#999FA6'/>

        <path className={arrowClassName} d="M15.3,19.6c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l4.7-4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0
	l-4,4l-4-4c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4L15.3,19.6z" fill='#999FA6'/>

      </svg>
    </>

  )
}
