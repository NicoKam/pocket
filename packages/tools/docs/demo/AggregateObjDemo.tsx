import React from 'react';
import ReactJson from 'react-json-view';
import { aggregateObj } from '@orca-fe/tools';

interface ExamResult {
  teacherName: string;
  teacherSubject: string;
  highScore: number;
  lowScore: number;
  avgScore: number;
  passRate: number;
  studentsCount: number;
}

const result: ExamResult = {
  teacherName: '张伟',
  teacherSubject: '数学',
  highScore: 98,
  lowScore: 72,
  avgScore: 85.5,
  passRate: 95,
  studentsCount: 40,
};

export default function AggregateObjDemo() {
  return (
    <div>
      <div>原对象：</div>
      <ReactJson src={result} />
      <div>聚合后的对象：</div>
      <ReactJson
        src={aggregateObj(result, {
          teacherInfo: ['teacherName', 'teacherSubject'],
          'baseInfo.score': ['highScore', 'lowScore', 'avgScore'],
          'baseInfo.pass': ['passRate', 'studentsCount'],
        })}
      />
    </div>
  );
}
