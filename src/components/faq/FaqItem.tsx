import cl from 'classnames';
import styles from './styles.module.css'
import { FunctionComponent, LegacyRef, RefObject, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/faq/ArrowIcon";
import { Question } from "@/components/faq/Faq";

interface Props {
  question: Question
}

export const FaqItem : FunctionComponent<Props> = ({ question }) => {
  const [answerHeight, setAnswerHeight] = useState(0);
  const [expanded, setExpand] = useState(false);
  const answerRef: LegacyRef<HTMLParagraphElement> = useRef(null);

  useEffect(() => {
    if (!answerRef.current) return;
    if (!answerRef.current?.scrollHeight) return;

    setAnswerHeight(answerRef.current?.scrollHeight);

    if (expanded) {
      answerRef.current.style.height = `${answerHeight}px`;
      answerRef.current.style.maxHeight = `${answerHeight}px`;
    } else {
      answerRef.current.style.height = '0';
      answerRef.current.style.maxHeight = '0';
    }
  }, [answerHeight, expanded])


  return (<div className={cl(styles.item)} onClick={() => setExpand(!expanded)}>
      <div className={cl(styles.question)}>
        <p>{question.question}</p>
        <ArrowIcon arrowClassName={expanded ? styles.arrowReversed : ''} />
      </div>
      <p ref={answerRef} className={cl(styles.answer, { [styles['answerExpanded']]: expanded })}>{question.answer}</p>
    </div>
  )
}
