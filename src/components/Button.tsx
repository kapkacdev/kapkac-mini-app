import React from 'react'

type ButtonProps = {
  label: string // Text to display inside the button
  size?: 'small' | 'medium' | 'large' // Button size
  variant?: 'primary' | 'secondary' | 'outline' // Style variant
  icon?: React.ReactNode // Icon component to display
  iconPosition?: 'left' | 'right' // Position of the icon
  onClick?: () => void // Click handler
  disabled?: boolean // Disabled state
}

const Button: React.FC<ButtonProps> = ({
  label,
  size = 'medium',
  variant = 'primary',
  icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
}) => {
  // Define class names for styles
  const sizeClasses = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg',
  }

  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    outline:
      'bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-100',
  }

  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors'

  const iconSpacing = icon ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''

  return (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses[size]} ${
        variantClasses[variant]
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && (
        <span className={`icon ${iconSpacing}`}>{icon}</span>
      )}
      {label}
      {icon && iconPosition === 'right' && (
        <span className={`icon ${iconSpacing}`}>{icon}</span>
      )}
    </button>
  )
}

export default Button
