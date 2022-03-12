import React from 'react'
import { useSelector } from 'react-redux'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import styled from 'styled-components'

import tagsSelectors from '../../../services/store/selectors/tags'

const Container = styled.div`
  .MuiPaper-root {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    list-style: none;
    padding: 4px;
    margin: 0px;

    .MuiChip-root {
    }
  }
`

function Tags() {
  const tags = useSelector(tagsSelectors.selectTags)

  return (
    <Container>
      <Paper component="ul">
        <Stack direction="row" spacing={2}>
          {tags.map((data) => {
            return (
              <Chip
                key={data.id}
                variant="outlined"
                icon={<TagFacesIcon />}
                label={data.label}
                onClick={() => null}
                onDelete={() => null}
              />
            )
          })}
        </Stack>
      </Paper>
    </Container>
  )
}

export default Tags
