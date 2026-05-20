import { mixins } from '../../../styles/js';

export const styles = (theme) => ({
  root: {
    width: '100%',
    ...mixins({ theme }).noselect,
  },
  tableWrapper: {
    ...mixins({ theme }).noOutline,
    position: 'relative',
    height: `calc(100vh - 120px)`,
    overflowY: 'auto',
    overflowX: 'auto',
    borderBottom: `solid 1px ${theme.palette.fileExplorerThinLineDividerColor}`,
    borderLeft: `solid 1px ${theme.palette.fileExplorerThinLineDividerColor}`,
    [`&.onHoverDropZone`]: {
      backgroundColor: theme.palette.fileDrop,
    },
    [`&.statusBarActive`]: {
      height: `calc(100vh - 150px) !important`,
    },
  },
  selectionLasso: {
    position: 'absolute',
    border: '1px solid rgba(41, 121, 255, 0.9)',
    backgroundColor: 'rgba(41, 121, 255, 0.2)',
    pointerEvents: 'none',
    zIndex: 10,
  },
});
