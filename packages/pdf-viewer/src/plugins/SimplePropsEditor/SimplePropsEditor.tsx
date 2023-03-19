import React from 'react';
import { Form } from 'antd';
import { Slider } from '@orca-fe/pocket';
import { ColorPicker } from '@orca-fe/painter';
import useStyles from './SimplePropsEditor.style';
import type { PropsType } from './def';

const ef = () => {};

export interface SimplePropsEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  propsDef?: PropsType[];
  value?: Record<string, any>;
  onChange?: (value: Record<string, any>) => void;
}

/**
 * 用于图形的属性编辑器，支持的属性类型有：
 * - strokeWidth 绘图宽度
 * @param props
 * @constructor
 */
const SimplePropsEditor = (props: SimplePropsEditorProps) => {
  const {
    className = '',
    propsDef = [],
    value,
    onChange = ef,
    ...otherProps
  } = props;
  const styles = useStyles();
  return (
    <Form
      initialValues={value}
      onValuesChange={(_, value) => {
        onChange(value);
      }}
    >
      <div className={`${styles.root} ${className}`} {...otherProps}>
        {propsDef.map(({ name, key, type, defaultValue, ...otherProps }) => (
          <React.Fragment key={key}>
            <div>
              {name}
              :
            </div>
            <div
              style={{
                ...(() => {
                  if (type === 'number') {
                    return {
                      paddingLeft: 12,
                      paddingRight: 12,
                    };
                  }
                  if (type === 'color') {
                    return {
                      justifySelf: 'end',
                    };
                  }
                  return {};
                })(),
              }}
            >
              <Form.Item noStyle name={key}>
                {(() => {
                  switch (type) {
                    case 'number':
                      return <Slider {...otherProps} />;
                    case 'font':
                      return 'fontEditor';
                    case 'color':
                      return <ColorPicker size={24} {...otherProps} />;
                    default:
                      return 'Unknown Editor';
                  }
                })()}
              </Form.Item>
            </div>
          </React.Fragment>
        ))}
      </div>
    </Form>
  );
};

export default SimplePropsEditor;
