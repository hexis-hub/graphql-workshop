import React from 'react';
import { Box, Heading, CheckBox, Text, DropButton } from 'grommet';
import { BarLoader, SyncLoader } from 'react-spinners';
import { StatusInfo } from 'grommet-icons';
import UserStatus from './UserStatus';

export default ({ isLoading, dataSet, onUpdateOne }) => (
  <Box
    border={{
      color: 'brand',
      size: 'xlarge'
    }}
  >
    <div
      style={{
        position: 'fixed'
      }}
    >
      <BarLoader
        widthUnit="%"
        width={100}
        color="lightblue"
        loading={isLoading}
      />
    </div>
    <Heading level={1} color="brand" textAlign="center">
      To-do list
    </Heading>
    {isLoading && !dataSet.length && (
      <div style={{ height: 150, textAlign: 'center', marginTop: 50 }}>
        <SyncLoader loading={isLoading} color="lightblue" />
      </div>
    )}
    {dataSet.map(
      (
        { id, title, completed, user: { name: username, todos: userTodos } },
        idx
      ) => (
        <Box
          flex="grow"
          pad="small"
          border={{ color: 'white', size: 'medium' }}
          background={idx % 2 ? 'light-1' : 'light-2'}
          key={id}
          direction="row"
        >
          <Box
            background={completed ? 'status-ok' : 'status-error'}
            style={{ width: 10, marginRight: 10 }}
          />
          <Box margin="auto 5px" style={{ width: 30 }}>
            <CheckBox
              checked={completed}
              disabled={isLoading}
              onChange={event =>
                onUpdateOne({
                  id,
                  completed: event.target.checked
                })
              }
            />
          </Box>
          <Box fill="horizontal" margin="auto 5px">
            <Text
              color="dark-3"
              size="medium"
              truncate
              style={{
                textDecoration: completed ? 'line-through' : 'none'
              }}
            >
              {title}
            </Text>
          </Box>
          <Box alignSelf="end">
            <DropButton
              plain
              reverse
              hoverIndicator="accent-4"
              size="small"
              icon={<StatusInfo />}
              label={
                <Text size="xsmall" truncate weight="bold">
                  {username}
                </Text>
              }
              dropContent={
                <UserStatus userTodos={userTodos} username={username} />
              }
            />
          </Box>
        </Box>
      )
    )}
  </Box>
);
