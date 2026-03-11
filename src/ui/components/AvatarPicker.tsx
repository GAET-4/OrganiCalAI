import { useRef } from 'react'
import { Camera } from 'lucide-react'

interface AvatarPickerProps {
  value?: string
  initials: string
  color?: string
  onChange: (base64: string | undefined) => void
}

export function AvatarPicker({ value, initials, color, onChange }: AvatarPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="group relative h-20 w-20 rounded-full overflow-hidden shrink-0 focus:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {value ? (
        <img src={value} alt="Avatar" className="h-full w-full object-cover" />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-white text-xl font-semibold"
          style={{ backgroundColor: color ?? 'var(--color-primary)' }}
        >
          {initials}
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
        <Camera className="h-5 w-5 text-white" />
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </button>
  )
}
