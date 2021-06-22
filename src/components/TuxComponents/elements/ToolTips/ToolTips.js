import styled, { css } from "styled-components";

export const ToolTip = styled.div`
  display: flex;
  align-items: center;
  ${(props) =>
    props.top &&
    css`
      flex-direction: column-reverse;
    `
  }
  ${(props) =>
    props.bottom &&
    css`
      flex-direction: column;
    `
  }
  ${(props) =>
    props.left &&
    css`
      flex-direction: row-reverse;
      justify-content: flex-end;
    `
  }
`

export const Arrow = styled.div`
  width: 0;
  height: 0;
  ${(props) =>
    props.left &&
    css`
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 8px solid red;
    `
  }
  ${(props) =>
    props.right &&
    css`
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid red;
      left: 50px;
      top: 7px;
    `
  }
  ${(props) =>
    props.top &&
    css`
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid red;
      left: -8px;
      top: 7px;
    `
  }
  ${(props) =>
    props.bottom &&
    css`
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid red;
      left: -8px;
      top: 7px;
    `
  }
`

export const Box = styled.div`
  display: inline-block;
  background: black;
  color: white;
  padding: 5px;
  border-radius: 3px;
`

// &:before {
//   content: '';
//   width: 0;
//   height: 0;
//   position: absolute;
//   ${(props) =>
//     props.left &&
//     css`
//       border-top: 8px solid transparent;
//       border-bottom: 8px solid transparent;
//       border-right: 8px solid blue;
//       left: -8px;
//       top: 7px;
//     `
//   }
//   ${(props) =>
//     props.right &&
//     css`
//       border-top: 8px solid transparent;
//       border-bottom: 8px solid transparent;
//       border-left: 8px solid blue;
//       left: 50px;
//       top: 7px;
//     `
//   }
//   ${(props) =>
//     props.top &&
//     css`
//       border-left: 8px solid transparent;
//       border-right: 8px solid transparent;
//       border-bottom: 8px solid blue;
//       left: -8px;
//       top: 7px;
//     `
//   }
//   ${(props) =>
//     props.bottom &&
//     css`
//       border-left: 8px solid transparent;
//       border-right: 8px solid transparent;
//       border-top: 8px solid blue;
//       left: -8px;
//       top: 7px;
//     `
//   }