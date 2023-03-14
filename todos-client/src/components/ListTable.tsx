import React, { FC, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ListI } from '../types/types';

interface Props {
    lists: ListI[]
}

export const ListTable: FC<Props> = ({ lists }) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><div style={{ fontWeight: 'bold' }}>Name</div></TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Owner ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lists.map((list) => (
            <TableRow
                key={list.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {list.name}
                </TableCell>
                <TableCell align="right">{list._id}</TableCell>
                <TableCell align="right">{list.owner_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}