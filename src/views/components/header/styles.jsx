export default theme => ({
    root: {
        flexGrow: 1,
    },
    logoWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '63px',
        flexShrink: 0,
        marginLeft: 10,
        marginRight: 20
    },
    logoLink: {
        fontSize: 0
    },
    logoImage: {
        cursor: 'pointer',
        justify: 'center'
    },
    logoDivider: {
        marginBottom: theme.spacing(2)
    },
    flex: {
        flex: 1,
    },
    profile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'fit-content'
    },
    avatar: {
        width: '100px',
        height: '100px'
    },
    nameText: {
        marginTop: theme.spacing(2)
    },
    bioText: {},
    profileDivider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 175,
    },
    fullList: {
        width: 'auto',
    },
    TopHeaderDataItem: {
        marginLeft: -12,
        marginRight: 20
    },
    // root: {
    //   backgroundColor: theme.palette.common.white,
    //   display: 'flex',
    //   flexDirection: 'column',
    //   height: '100%',
    //   paddingLeft: theme.spacing(1),
    //   paddingRight: theme.spacing(1)
    // },
    // logoWrapper: {
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   height: '63px',
    //   flexShrink: 0
    // },
    // logoLink: {
    //   fontSize: 0
    // },
    // logoImage: {
    //   cursor: 'pointer'
    // },
    // logoDivider: {
    //   marginBottom: theme.spacing(2)
    // },
    // profile: {
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   minHeight: 'fit-content'
    // },
    // avatar: {
    //   width: '100px',
    //   height: '100px'
    // },
    // nameText: {
    //   marginTop: theme.spacing(2)
    // },
    // bioText: {},
    // profileDivider: {
    //   marginBottom: theme.spacing(2),
    //   marginTop: theme.spacing(2)
    // },
    // listSubheader: {
    //   color: theme.palette.text.secondary
    // },
    // listItem: {
    //   cursor: 'pointer',
    //   '&:hover': {
    //     backgroundColor: theme.palette.primary.light,
    //     borderLeft: `4px solid ${theme.palette.primary.main}`,
    //     borderRadius: '4px',
    //     '& $listItemIcon': {
    //       color: theme.palette.primary.main,
    //       marginLeft: '-4px'
    //     }
    //   },
    //   '& + &': {
    //     marginTop: theme.spacing.unit
    //   }
    // },
    // activeListItem: {
    //   borderLeft: `4px solid ${theme.palette.primary.main}`,
    //   borderRadius: '4px',
    //   backgroundColor: theme.palette.primary.light,
    //   '& $listItemText': {
    //     color: theme.palette.text.primary
    //   },
    //   '& $listItemIcon': {
    //     color: theme.palette.primary.main,
    //     marginLeft: '-4px'
    //   }
    // },
    // listItemIcon: {
    //   marginRight: 0
    // },
    // listItemText: {
    //   fontWeight: 500,
    //   color: theme.palette.text.secondary
    // },
    // listDivider: {
    //   marginBottom: theme.spacing(2),
    //   marginTop: theme.spacing(2)
    // }
});