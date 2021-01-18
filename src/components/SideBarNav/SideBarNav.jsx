import React from 'react';
import * as U from '../TuxComponents/UniversalComponents';

const SideBarNav = ({
  sections,
  currentSection,
  currentSectionIndex,
  currentModule,
  currentModuleIndex,
  handleJumpToSection,
  handleCurrentSection,
  handleCurrentModule,
  started,
  handleStarted,
}) => {
  return (
    <U.SideBarParent>
      <U.SideBar>
        <U.ColorBlock SideBarYellow></U.ColorBlock>
        <U.SideBarTextBox>
          {sections.map((section, index) =>
            index === 0 ? (
              <U.SideBarText
                past={currentSectionIndex < index ? true : false}
                present={currentSectionIndex === index}
                key={index}
                onClick={() => handleJumpToSection(index)}
              >
                {section.name}
              </U.SideBarText>
            ) : (
              <U.SideBarText
                past={currentSectionIndex < index ? true : false}
                present={currentSectionIndex === index}
                key={index}
                onClick={() => handleJumpToSection(index)}
              >
                {index}. {section.name}
              </U.SideBarText>
            )
          )}
        </U.SideBarTextBox>
        {!started && (
          <U.WideBtn enable onClick={() => handleStarted()}>
            Begin
          </U.WideBtn>
        )}
        {started  &&
          currentSectionIndex < sections.length - 1 &&
          currentModuleIndex < currentSection.modules.length + 1 && (
            <U.WideBtn enable onClick={() => handleCurrentModule()}>
              Next
            </U.WideBtn>
          )}

        {/* <U.WideBtn enable onClick={() => handleCurrentModule()}>
          Submit
        </U.WideBtn> */}
      </U.SideBar>
    </U.SideBarParent>
  );
};

export default SideBarNav;
