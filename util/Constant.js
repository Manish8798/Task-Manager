import moment from 'moment';
export const Colors = {
  HeadText: '#18306D',
  SubText: '#1B21B5',
  ButtonColor: '#868BFE',
  DescTextColor: '#CDCFF6',
  CreateButton: '#F82626',
  FadeText: '#D9D9D9',
  BackgroundColor: '#FAFAFA',
  Yellow: '#FDBA5D'
};

export function getCurrentLocalTime() {
  return `${moment().format()}`;
}
