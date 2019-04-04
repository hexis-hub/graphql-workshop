import React, { useState } from 'react';
import { countBy } from 'lodash';
import { Box, Meter, Text } from 'grommet';
import { Analytics } from 'grommet-icons';

export default ({ username, userTodos }) => {
  const todosByStatus = countBy(userTodos, 'completed');
  const successStatus = {
    value: todosByStatus[true] || 0,
    color: 'status-ok',
    label: 'DONE'
  };
  const errorStatus = {
    value: todosByStatus[false] || 0,
    color: 'status-error',
    label: 'TO BE DONE'
  };
  const total = successStatus.value + errorStatus.value;
  const defaultStatus = successStatus.value ? successStatus : errorStatus;
  const [status, setDisplayedMeta] = useState(true);
  const { value, label, color } = status ? defaultStatus : errorStatus;

  return (
    <Box pad="large" background="light-2">
      <h2>{username}</h2>
      <div style={{ marginTop: 10, marginBottom: 30 }}>
        <Analytics color="dark-1" style={{ marginBottom: -2 }} />
        <Text
          color="dark-1"
          weight="bold"
          size="xlarge"
          style={{
            margin: 10
          }}
        >
          {value}/{total}
        </Text>
        <Text color={color} weight="bold" size="small">
          {label}
        </Text>
      </div>
      <Meter
        values={[
          successStatus,
          {
            ...errorStatus,
            onHover: isHovering => setDisplayedMeta(!isHovering)
          }
        ]}
        aria-label="meter"
      />
    </Box>
  );
};
