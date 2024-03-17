import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";

const HouseHoldTable = ({ csvData }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>날짜</TableHead>
          <TableHead>항목</TableHead>
          <TableHead>카테고리</TableHead>
          <TableHead>수입</TableHead>
          <TableHead>지출</TableHead>
          <TableHead>비고</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {csvData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.날짜}</TableCell>
            <TableCell>{item.항목}</TableCell>
            <TableCell>{item.카테고리}</TableCell>
            <TableCell>{item.수입}</TableCell>
            <TableCell>{item.지출}</TableCell>
            <TableCell>{item.비고}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HouseHoldTable;
