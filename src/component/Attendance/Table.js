import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const styles = theme => ({
  root: {
    width: '800px',
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
});


function createData(Date, LTR, ETL, Day) {

  return {Date, LTR, ETL, Day};
}

const data = [
  createData('03/22/18', 0, 0, 1),
  createData('04/12/18', 0, .25, 0),
  createData('05/16/18', .5, 0, 0),
  createData('06/01/18', 0, 0, 1),
  createData('07/04/18', .25, 0, 0),
  createData('Totals:', .75, .25, 2 )
];

function AttTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell string>Date</CustomTableCell>
            <CustomTableCell numeric>LTR</CustomTableCell>
            <CustomTableCell numeric>ETL</CustomTableCell>
            <CustomTableCell numeric>Day</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.Date}>
                <CustomTableCell component="th" scope="row">
                  {n.Date}
                </CustomTableCell>
                <CustomTableCell numeric>{n.LTR}</CustomTableCell>
                <CustomTableCell numeric>{n.ETL}</CustomTableCell>
                <CustomTableCell numeric>{n.Day}</CustomTableCell>
  
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

AttTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AttTable);