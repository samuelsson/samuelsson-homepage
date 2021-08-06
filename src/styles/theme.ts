import colors from './colors';

export type Theme = {
  body: {
    backgroundColor: string;
    color: string;
  };
  blockquote: {
    backgroundColor: string;
    beforeColor: string;
    borderLeftColor: string;
    color: string;
    citeColor: string;
  };
  prism: {
    code: {
      color: string;
      backgroundColor: string;
    };
    codeBlock: {
      color: string;
      backgroundColor: string;
      boxShadow: string;
    };
  };
  Footer: {
    backgroundColor: string;
    borderTopColor: string;
  };
  Navigation: {
    a: {
      color: string;
      hoverColor: string;
      activeColor: string;
    };
  };
  PostHeader: {
    StyledTag: {
      color: string;
      backgroundColor: string;
      boxShadow: string;
      hoverColor: string;
      hoverBoxShadow: string;
      hoverBackgroundColor: string;
    };
  };
  PostList: {
    StyledLink: {
      borderBottom: string;
      hoverBackgroundColor: string;
    };
  };
  PostMeta: {
    color: string;
    hoverColor: string;
  };
};

export const light: Theme = {
  body: {
    backgroundColor: colors.gray[100],
    color: colors.gray[800],
  },
  blockquote: {
    backgroundColor: colors.gray[200],
    beforeColor: colors.gray[600],
    borderLeftColor: colors.gray[600],
    color: colors.gray[700],
    citeColor: colors.gray[800],
  },
  prism: {
    code: {
      color: colors.gray[800],
      backgroundColor: 'rgba(27, 31, 35, 0.08)',
    },
    codeBlock: {
      color: '#d3e1f0',
      backgroundColor: '#23232d',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)',
    },
  },
  Footer: {
    backgroundColor: colors.gray[200],
    borderTopColor: colors.gray[300],
  },
  Navigation: {
    a: {
      color: colors.gray[700],
      hoverColor: colors.black,
      activeColor: colors.black,
    },
  },
  PostHeader: {
    StyledTag: {
      color: colors.gray[700],
      backgroundColor: colors.gray[300],
      boxShadow: `0 2px 3px ${colors.gray[500]}`,
      hoverColor: colors.white,
      hoverBackgroundColor: colors.blue,
      hoverBoxShadow: `0 2px 5px ${colors.gray[600]}`,
    },
  },
  PostList: {
    StyledLink: {
      borderBottom: `1px solid ${colors.gray[400]}`,
      hoverBackgroundColor: colors.gray[200],
    },
  },
  PostMeta: {
    color: colors.gray[700],
    hoverColor: colors.black,
  },
};

export const dark: Theme = {
  body: {
    backgroundColor: colors.blueGray[600],
    color: colors.blueGray[300],
  },
  blockquote: {
    backgroundColor: colors.blueGray[700],
    beforeColor: colors.blueGray[200],
    borderLeftColor: colors.blueGray[800],
    color: colors.blueGray[200],
    citeColor: colors.blueGray[400],
  },
  prism: {
    code: {
      color: colors.blueGray[200],
      backgroundColor: colors.blueGray[800],
    },
    codeBlock: {
      color: colors.blueGray[300],
      backgroundColor: colors.blueGray[800],
      boxShadow: 'none',
    },
  },
  Footer: {
    backgroundColor: colors.blueGray[800],
    borderTopColor: colors.blueGray[900],
  },
  Navigation: {
    a: {
      color: colors.blueGray[400],
      hoverColor: colors.blueGray[200],
      activeColor: colors.blueGray[200],
    },
  },
  PostHeader: {
    StyledTag: {
      color: colors.blueGray[400],
      backgroundColor: colors.blueGray[800],
      boxShadow: 'none',
      hoverColor: colors.white,
      hoverBackgroundColor: colors.blue,
      hoverBoxShadow: 'none',
    },
  },
  PostList: {
    StyledLink: {
      borderBottom: `1px solid ${colors.blueGray[800]}`,
      hoverBackgroundColor: colors.blueGray[700],
    },
  },
  PostMeta: {
    color: colors.blueGray[400],
    hoverColor: colors.blueGray[200],
  },
};
