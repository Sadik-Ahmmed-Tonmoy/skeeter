'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/navigation';

// Types
type MenuMode = 'vertical' | 'horizontal';
type MenuTheme = 'light' | 'dark';

interface MenuItemProps {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  children?: MenuItemProps[];
}

interface MenuProps {
  items: MenuItemProps[];
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
  mode?: MenuMode;
  theme?: MenuTheme;
  className?: string;
  onSelect?: (key: string) => void;
}

// Animation constants
const ANIMATION_DURATION = 220;
const ANIMATION_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

// Styled Components
const MenuWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$mode', '$theme'].includes(prop),
})<{ $mode: MenuMode; $theme: MenuTheme }>`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5715;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  
  ${({ $mode }) => $mode === 'horizontal' && css`
    display: flex;
    flex-wrap: nowrap;
    border-bottom: 1px solid #f0f0f0;
    white-space: nowrap;
  `}
  
  ${({ $theme }) => $theme === 'dark' && css`
    background-color: #001529;
    color: rgba(255, 255, 255, 0.65);
  `}
`;

const MenuItemLink = styled.a.attrs({ tabIndex: 0 })<{
  $active: boolean;
  $disabled: boolean;
  $level: number;
  $mode: MenuMode;
  $theme: MenuTheme;
}>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ $mode }) => $mode === 'horizontal' ? '0 20px' : '12px 16px'};
  color: inherit;
  text-decoration: none;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.15s ${ANIMATION_EASING};
  opacity: ${({ $disabled }) => $disabled ? 0.6 : 1};
  
  ${({ $level, $mode }) => $mode === 'vertical' && $level > 0 && css`
    padding-left: ${16 + ($level * 16)}px;
  `}
  
  ${({ $active, $theme }) => $active && $theme === 'light' && css`
    color: #1677ff;
    background-color: rgba(22, 119, 255, 0.1);
  `}
  
  ${({ $active, $theme }) => $active && $theme === 'dark' && css`
    color: #fff;
    background-color: #1677ff;
  `}
  
  &:hover {
    ${({ $disabled, $theme }) => !$disabled && $theme === 'light' && css`
      color: #1677ff;
      background-color: rgba(22, 119, 255, 0.05);
    `}
    
    ${({ $disabled, $theme }) => !$disabled && $theme === 'dark' && css`
      color: #fff;
      background-color: rgba(255, 255, 255, 0.1);
    `}
  }

  &:focus-visible {
    outline: 2px solid #1677ff;
    outline-offset: -2px;
  }
`;

const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const DropdownIcon = styled.span<{ $isOpen: boolean; $mode: MenuMode }>`
  margin-left: 8px;
  font-size: 12px;
  transition: transform ${ANIMATION_DURATION}ms ${ANIMATION_EASING};
  display: inline-flex;
  align-items: center;
  
  ${({ $isOpen }) => $isOpen && css`
    transform: rotate(180deg);
  `}
  
  ${({ $mode }) => $mode === 'horizontal' && css`
    margin-left: 4px;
  `}
`;

const SubMenuWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$isOpen', '$mode'].includes(prop),
})<{ $isOpen: boolean; $mode: MenuMode }>`
  position: ${({ $mode }) => $mode === 'horizontal' ? 'absolute' : 'relative'};
  z-index: 1050;
  min-width: 160px;
  overflow: hidden;
  
  ${({ $mode }) => $mode === 'horizontal' && css`
    top: 100%;
    left: 0;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  `}
`;

const SubMenuContent = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$theme', '$mode', '$state'].includes(prop),
})<{ 
  $theme: MenuTheme; 
  $mode: MenuMode;
  $state: string;
}>`
  background: ${({ $theme }) => $theme === 'light' ? '#fff' : '#1f1f1f'};
  border-radius: ${({ $mode }) => $mode === 'horizontal' ? '8px' : '0'};
  transition: all ${ANIMATION_DURATION}ms ${ANIMATION_EASING};
  transform-origin: top center;
  will-change: transform, opacity;
  
  ${({ $mode }) => $mode === 'horizontal' && css`
    padding: 4px 0;
    border: 1px solid rgba(0, 0, 0, 0.06);
  `}
  
  /* Animation states */
  ${({ $state }) => $state === 'entering' && css`
    opacity: 0;
    transform: translateY(-4px);
  `}
  
  ${({ $state }) => $state === 'entered' && css`
    opacity: 1;
    transform: translateY(0);
  `}
  
  ${({ $state }) => $state === 'exiting' && css`
    opacity: 0;
    transform: translateY(-4px);
    transition: all ${ANIMATION_DURATION - 50}ms ${ANIMATION_EASING};
  `}
  
  ${({ $state }) => $state === 'exited' && css`
    opacity: 0;
    transform: translateY(-4px);
    pointer-events: none;
  `}
`;

const IconWrapper = styled.span`
  margin-right: 10px;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
`;

// Components
const MenuItem: React.FC<{
  item: MenuItemProps;
  active: boolean;
  disabled: boolean;
  level: number;
  mode: MenuMode;
  theme: MenuTheme;
  isOpen?: boolean;
  onClick: (e: React.MouseEvent, key: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = ({ item, active, disabled, level, mode, theme, isOpen, onClick, onMouseEnter, onMouseLeave }) => {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    if (item.href) {
      e.preventDefault();
      router.push(item.href);
    }
    
    onClick(e, item.key);
  };

  return (
    <MenuItemLink
      href={item.href || '#'}
      $active={active}
      $disabled={disabled}
      $level={level}
      $mode={mode}
      $theme={theme}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-disabled={disabled}
    >
      <MenuItemContent>
        {item.icon && <IconWrapper>{item.icon}</IconWrapper>}
        <span>{item.label}</span>
      </MenuItemContent>
      {item.children && (
        <DropdownIcon $isOpen={!!isOpen} $mode={mode}>
          <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M3.646 5.646a.5.5 0 0 1 .708 0L8 9.293l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708z"/>
          </svg>
        </DropdownIcon>
      )}
    </MenuItemLink>
  );
};

const SubMenu: React.FC<{
  item: MenuItemProps;
  level: number;
  mode: MenuMode;
  theme: MenuTheme;
  openKeys: string[];
  selectedKeys: string[];
  onOpenChange: (key: string) => void;
  onSelect: (key: string) => void;
}> = ({ item, level, mode, theme, openKeys, selectedKeys, onOpenChange, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isOpen = openKeys.includes(item.key) || (mode === 'horizontal' && isHovered);
  
  const handleMouseEnter = () => {
    if (mode === 'horizontal') {
      setIsHovered(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (mode === 'horizontal') {
      setIsHovered(false);
    }
  };
  
  const handleClick = (e: React.MouseEvent, key: string) => {
    if (item.disabled) return;
    
    if (item.href) {
      // If it has href, don't toggle submenu
      return;
    }
    
    e.preventDefault();
    onOpenChange(key);
  };
  
  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative' }}
    >
      <MenuItem
        item={item}
        active={selectedKeys.includes(item.key)}
        disabled={!!item.disabled}
        level={level}
        mode={mode}
        theme={theme}
        isOpen={isOpen}
        onClick={handleClick}
      />
      
      {item.children && (
        <Transition 
          in={isOpen} 
          timeout={ANIMATION_DURATION} 
          nodeRef={nodeRef} 
          unmountOnExit
        >
          {(state) => (
            <SubMenuWrapper $isOpen={isOpen} $mode={mode} ref={nodeRef}>
              <SubMenuContent $theme={theme} $mode={mode} $state={state}>
                {item?.children?.map(child => {
                  if (child.children) {
                    return (
                      <SubMenu
                        key={child.key}
                        item={child}
                        level={level + 1}
                        mode={mode}
                        theme={theme}
                        openKeys={openKeys}
                        selectedKeys={selectedKeys}
                        onOpenChange={onOpenChange}
                        onSelect={onSelect}
                      />
                    );
                  }
                  return (
                    <MenuItem
                      key={child.key}
                      item={child}
                      active={selectedKeys.includes(child.key)}
                      disabled={!!child.disabled}
                      level={level + 1}
                      mode={mode}
                      theme={theme}
                      onClick={(e) => {
                        onSelect(child.key);
                        if (child.href) {
                          e.preventDefault();
                        }
                      }}
                    />
                  );
                })}
              </SubMenuContent>
            </SubMenuWrapper>
          )}
        </Transition>
      )}
    </div>
  );
};

const MyMenu: React.FC<MenuProps> = ({
  items,
  defaultSelectedKeys = [],
  defaultOpenKeys = [],
  mode = 'vertical',
  theme = 'light',
  className,
  onSelect,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);
  
  const handleSelect = (key: string) => {
    setSelectedKeys([key]);
    onSelect?.(key);
    
    if (mode === 'horizontal') {
      setOpenKeys([]);
    }
  };
  
  const handleOpenChange = (key: string) => {
    const newOpenKeys = openKeys.includes(key)
      ? openKeys.filter(k => k !== key)
      : [...openKeys, key];
    setOpenKeys(newOpenKeys);
  };
  
  // Close submenus when clicking outside (for horizontal mode)
  useEffect(() => {
    if (mode !== 'horizontal') return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const menuElement = document.querySelector('.menu-wrapper');
      if (menuElement && !menuElement.contains(event.target as Node)) {
        setOpenKeys([]);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mode]);
  
  return (
    <MenuWrapper 
      $mode={mode} 
      $theme={theme} 
      className={`menu-wrapper ${className || ''}`}
    >
      {items.map(item => {
        if (item.children) {
          return (
            <SubMenu
              key={item.key}
              item={item}
              level={0}
              mode={mode}
              theme={theme}
              openKeys={openKeys}
              selectedKeys={selectedKeys}
              onOpenChange={handleOpenChange}
              onSelect={handleSelect}
            />
          );
        }
        return (
          <MenuItem
            key={item.key}
            item={item}
            active={selectedKeys.includes(item.key)}
            disabled={!!item.disabled}
            level={0}
            mode={mode}
            theme={theme}
            onClick={(e) => {
              handleSelect(item.key);
              if (item.href) {
                e.preventDefault();
              }
            }}
          />
        );
      })}
    </MenuWrapper>
  );
};

export default MyMenu;