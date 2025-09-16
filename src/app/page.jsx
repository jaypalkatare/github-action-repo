'use client'

import React, { useState, useEffect } from 'react'
import ShootingStarEffect from '@/components/ShootingStarEffect'
import FloatingSquares from '@/components/FloatingSquares'
import toast from 'react-hot-toast'

const IMAGE_FORMATS = {
  // Raster Formats
  'jpeg': { mime: 'image/jpeg', ext: '.jpeg', category: 'Raster' },
  'jpg': { mime: 'image/jpeg', ext: '.jpg', category: 'Raster' },
  'png': { mime: 'image/png', ext: '.png', category: 'Raster' },
  'gif': { mime: 'image/gif', ext: '.gif', category: 'Raster' },
  'bmp': { mime: 'image/bmp', ext: '.bmp', category: 'Raster' },
  'tiff': { mime: 'image/tiff', ext: '.tiff', category: 'Raster' },
  'webp': { mime: 'image/webp', ext: '.webp', category: 'Raster' },
  'heic': { mime: 'image/heic', ext: '.heic', category: 'Raster' },
  'raw': { mime: 'image/raw', ext: '.raw', category: 'Raster' },
  'pcx': { mime: 'image/pcx', ext: '.pcx', category: 'Raster' },
  'tga': { mime: 'image/tga', ext: '.tga', category: 'Raster' },
  'ico': { mime: 'image/x-icon', ext: '.ico', category: 'Raster' },
  'hdr': { mime: 'image/vnd.radiance', ext: '.hdr', category: 'Raster' },
  'exr': { mime: 'image/x-exr', ext: '.exr', category: 'Raster' },
  
  // Vector Formats
  'svg': { mime: 'image/svg+xml', ext: '.svg', category: 'Vector' },
  'eps': { mime: 'application/postscript', ext: '.eps', category: 'Vector' },
  'pdf': { mime: 'application/pdf', ext: '.pdf', category: 'Vector' },
  'ai': { mime: 'application/postscript', ext: '.ai', category: 'Vector' },
  'wmf': { mime: 'image/wmf', ext: '.wmf', category: 'Vector' },
  'emf': { mime: 'image/emf', ext: '.emf', category: 'Vector' },
  
  // Animation Formats
  'apng': { mime: 'image/apng', ext: '.apng', category: 'Animation' },
  'mng': { mime: 'video/x-mng', ext: '.mng', category: 'Animation' },
  
  // Professional Formats
  'psd': { mime: 'image/vnd.adobe.photoshop', ext: '.psd', category: 'Professional' },
  'xcf': { mime: 'image/x-xcf', ext: '.xcf', category: 'Professional' },
  'cdr': { mime: 'application/cdr', ext: '.cdr', category: 'Professional' },
  
  // Scientific/Technical Formats
  'fits': { mime: 'image/fits', ext: '.fits', category: 'Scientific' },
  'pgf': { mime: 'image/pgf', ext: '.pgf', category: 'Scientific' },
  'pbm': { mime: 'image/x-portable-bitmap', ext: '.pbm', category: 'Scientific' },
  'pgm': { mime: 'image/x-portable-graymap', ext: '.pgm', category: 'Scientific' },
  'ppm': { mime: 'image/x-portable-pixmap', ext: '.ppm', category: 'Scientific' }
}

// Group formats by category
const GROUPED_FORMATS = Object.entries(IMAGE_FORMATS).reduce((acc, [format, info]) => {
  if (!acc[info.category]) {
    acc[info.category] = [];
  }
  acc[info.category].push(format);
  return acc;
}, {});

function PreviewPopup({ image, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative bg-white rounded-lg p-4 max-w-3xl max-h-[90vh] w-full mx-4" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="mt-4">
          <img
            src={image}
            alt="Preview"
            className="max-w-full max-h-[80vh] object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  )
}

// Updated ConvertedFile component with multi-color shadow
const ConvertedFile = ({ file, onDelete }) => {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 
      transition-all duration-200
      hover:bg-white/30 
      hover:shadow-[4px_4px_10px_rgba(168,85,247,0.15),-4px_-4px_10px_rgba(236,72,153,0.15)]
      border border-transparent
      hover:border-white/30
      group"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-sm font-medium text-gray-700 truncate transition-colors duration-200 group-hover:text-gray-900">
            {file.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500 transition-colors duration-200 group-hover:text-gray-600">
              {(file.size || 0).toFixed(2)} KB
            </span>
            <span className="text-xs px-2 py-0.5 bg-purple-100/50 text-purple-700 
              rounded-full transition-colors duration-200 group-hover:bg-purple-100">
              {file.format.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Download button - appears on hover */}
          <a
            href={file.url}
            download={file.name}
            className="p-1.5 rounded-full
              transition-all duration-150
              hover:shadow-[0_0_8px_rgba(34,197,94,0.3)]
              active:scale-95
              relative
              group/download
              opacity-0 group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <svg 
              className="w-4 h-4 transition-colors duration-150
                text-gray-400 group-hover/download:text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                className="transition-transform duration-200 group-hover/download:translate-y-[1px]" 
              />
            </svg>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 
              bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 
              group-hover/download:opacity-100 transition-opacity duration-150
              pointer-events-none whitespace-nowrap z-10">
              Download
            </span>
          </a>
          {/* Delete button - always visible with persistent icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 rounded-full
              transition-all duration-150
              hover:shadow-[0_0_8px_rgba(239,68,68,0.3)]
              active:scale-95
              relative
              group/delete"
          >
            <svg 
              className="w-4 h-4 transition-colors duration-150
                text-gray-400 hover:text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12"
                className="transition-transform duration-200" 
              />
            </svg>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 
              bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 
              group-hover/delete:opacity-100 transition-opacity duration-150
              pointer-events-none whitespace-nowrap z-10">
              Delete
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Add this new component for selected items
const SelectedItem = ({ file, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-lg p-3 mb-2 group hover:bg-white/80 transition-all">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-700 font-medium truncate">{file.name}</p>
          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
        </div>
      </div>
      <button
        onClick={() => onRemove(file)}
        className="ml-2 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        title="Remove file"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

// Update the conversion button in your main component
const ConversionButton = ({ loading, fileCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`py-2 px-4 rounded-lg text-white font-semibold flex items-center gap-2 ${
        loading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
      } transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Converting...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {fileCount === 1 ? 'Convert' : 'Convert All'}
        </>
      )}
    </button>
  )
}

// Error Popup Component
const ErrorPopup = ({ error, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm animate-fadeIn">
      <div className="animate-scaleIn">
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100
          border border-red-100 rounded-xl shadow-lg 
          p-6 pr-14 min-w-[380px] max-w-md
          hover:shadow-[0_8px_25px_rgba(239,68,68,0.2)]
          transition-all duration-300
          transform hover:-translate-y-0.5"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full
              text-gray-400 hover:text-red-500 
              hover:bg-red-50/80
              transition-all duration-200
              hover:shadow-[0_0_8px_rgba(239,68,68,0.3)]
              group"
          >
            <svg 
              className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>

          {/* Error Icon and Message */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-red-100/80 rounded-full flex-shrink-0 
              group-hover:bg-red-200/80 transition-colors duration-200">
              <svg 
                className="w-6 h-6 text-red-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <div>
              <h3 className="text-red-500 font-semibold text-lg mb-2">Error</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{error}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
    const [selectedImage, setSelectedImage] = useState(null)
    const [convertedImage, setConvertedImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [preview, setPreview] = useState(null)
    const [fromFormat, setFromFormat] = useState('jpg')
    const [toFormat, setToFormat] = useState('png')
    const [convertedFiles, setConvertedFiles] = useState([])
    const [previewImage, setPreviewImage] = useState(null)
    const [showSidebar, setShowSidebar] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [processingFiles, setProcessingFiles] = useState(false)

    // Auto-hide sidebar when empty
    useEffect(() => {
      if (convertedFiles.length === 0) {
        setShowSidebar(false);
      }
    }, [convertedFiles.length]);

    // Show sidebar when files are converted
    useEffect(() => {
      if (convertedFiles.length > 0) {
        setShowSidebar(true);
      }
    }, [convertedFiles.length]);

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setError('')
        
        if (file) {
            if (file.type === IMAGE_FORMATS[fromFormat].mime) {
                setSelectedImage(file)
                setPreview(URL.createObjectURL(file))
                setConvertedImage(null)
            } else {
                setError(`Please select a ${fromFormat.toUpperCase()} image`)
                e.target.value = null
            }
        }
    }

    const handleConversion = async () => {
      if (selectedFiles.length === 0) {
        handleError("Please select at least one file to convert");
        return;
      }
      
      setLoading(true)
      setError('')

      try {
        if (selectedFiles.length > 0) {
          // Handle multiple files
          for (const file of selectedFiles) {
            await convertSingleFile(file)
          }
        } else {
          // Handle single file (legacy support)
          await convertSingleFile(selectedImage)
        }
      } catch (err) {
        handleError(err.message || "An error occurred during conversion");
      } finally {
        setLoading(false)
      }
    }

    const convertSingleFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const img = document.createElement('img')
          img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            
            canvas.toBlob((blob) => {
              const url = URL.createObjectURL(blob)
              const newFile = {
                id: Date.now() + Math.random(),
                url,
                name: `${file.name.split('.')[0]}.${toFormat}`,
                format: toFormat,
                timestamp: new Date()
              }
              setConvertedFiles(prev => [...prev, newFile])
              resolve()
            }, IMAGE_FORMATS[toFormat]?.mime || 'image/png')
          }
          img.onerror = () => {
            reject(new Error('Failed to load image'))
          }
          img.src = event.target.result
        }
        reader.onerror = () => {
          reject(new Error('Failed to read file'))
        }
        reader.readAsDataURL(file)
      })
    }

    const handleDeleteFile = (id) => {
        setConvertedFiles(prev => {
            const newFiles = prev.filter(file => file.id !== id)
            // Cleanup URL
            const file = prev.find(f => f.id === id)
            if (file) URL.revokeObjectURL(file.url)
            return newFiles
        })
    }

    const downloadImage = () => {
        if (!convertedImage) return

        const link = document.createElement('a')
        link.href = convertedImage
        link.download = `${selectedImage.name.split('.')[0]}.${toFormat}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    React.useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview)
            if (convertedImage) URL.revokeObjectURL(convertedImage)
        }
    }, [preview, convertedImage])

    const handleFileSelection = (e) => {
      const files = Array.from(e.target.files)
      setError('')
      
      // Filter valid files
      const validFiles = files.filter(file => {
        const isValidType = file.type === IMAGE_FORMATS[fromFormat]?.mime
        if (!isValidType) {
          setError(`Some files were skipped. Please select only ${fromFormat.toUpperCase()} images`)
        }
        return isValidType
      })

      setSelectedFiles(validFiles)
      if (validFiles.length > 0) {
        setSelectedImage(validFiles[0]) // Keep for compatibility
      }
    }

    const handleFolderSelection = async (e) => {
      const files = Array.from(e.target.files)
      setError('')
      setProcessingFiles(true)

      try {
        // Filter valid files from folder
        const validFiles = files.filter(file => 
          file.type === IMAGE_FORMATS[fromFormat]?.mime
        )

        if (validFiles.length === 0) {
          setError(`No valid ${fromFormat.toUpperCase()} files found in folder`)
        } else if (validFiles.length < files.length) {
          setError(`Some files were skipped. Only ${fromFormat.toUpperCase()} files will be converted`)
        }

        setSelectedFiles(validFiles)
        if (validFiles.length > 0) {
          setSelectedImage(validFiles[0]) // Keep for compatibility
        }
      } catch (err) {
        setError('Error processing folder')
      } finally {
        setProcessingFiles(false)
      }
    }

    const removeFile = (fileToRemove) => {
      setSelectedFiles(prev => prev.filter(file => file !== fileToRemove))
      if (selectedFiles.length === 1) {
        setSelectedImage(null)
      }
    }

    // Error handling function
    const handleError = (errorMessage) => {
      setError(errorMessage);
      // Auto-hide error after 5 seconds
      setTimeout(() => setError(null), 5000);
    };

    const handleConvert = () => {
      if (!fromFormat) {
        toast.error('Please select a format to convert from');
        return;
      }
      if (!toFormat) {
        toast.error('Please select a format to convert to');
        return;
      }
      // Conversion logic here
      toast.success('Converting...');
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 overflow-hidden">
            <ShootingStarEffect />
            <FloatingSquares />
            <main className="relative min-h-screen mx-auto max-w-6xl p-8 z-10" onClick={e => e.stopPropagation()}>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold text-center mb-12 relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 animate-gradient">
                            Universal Image Converter 01
                        </span>
                        {/* Decorative elements */}
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    </h1>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-purple-100">
                        {/* Format Selection */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="relative">
                                <label className="block text-base font-semibold text-purple-700 mb-2">
                                    Convert From
                                </label>
                                <div className="relative">
                                    <select
                                        value={fromFormat}
                                        onChange={(e) => {
                                            setFromFormat(e.target.value)
                                            setSelectedImage(null)
                                            setPreview(null)
                                            setConvertedImage(null)
                                        }}
                                        className="w-full p-3 text-gray-700 bg-white border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 appearance-none shadow-sm hover:border-purple-300 transition-colors"
                                    >
                                        {Object.entries(GROUPED_FORMATS).map(([category, formats]) => (
                                            <optgroup 
                                                key={category} 
                                                label={category}
                                                className="text-sm font-medium text-gray-700 bg-purple-50"
                                            >
                                                {formats.map(format => (
                                                    <option 
                                                        key={format} 
                                                        value={format}
                                                        className="text-base bg-white hover:bg-purple-50"
                                                    >
                                                        {format.toUpperCase()}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative">
                                <label className="block text-base font-semibold text-pink-700 mb-2">
                                    Convert To
                                </label>
                                <div className="relative">
                                    <select
                                        value={toFormat}
                                        onChange={(e) => {
                                            setToFormat(e.target.value)
                                            setConvertedImage(null)
                                        }}
                                        className="w-full p-3 text-gray-700 bg-white border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 appearance-none shadow-sm hover:border-pink-300 transition-colors"
                                    >
                                        {Object.entries(GROUPED_FORMATS).map(([category, formats]) => (
                                            <optgroup 
                                                key={category} 
                                                label={category}
                                                className="text-sm font-medium text-gray-700 bg-pink-50"
                                            >
                                                {formats
                                                    .filter(format => format !== fromFormat)
                                                    .map(format => (
                                                        <option 
                                                            key={format} 
                                                            value={format}
                                                            className="text-base bg-white hover:bg-pink-50"
                                                        >
                                                            {format.toUpperCase()}
                                                        </option>
                                                    ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Updated File Input Section */}
                        <div className="mb-8 space-y-4">
                          <label className="block text-base font-semibold text-gray-700">
                            Select {fromFormat.toUpperCase()} Images
                          </label>
                          
                          <div className="flex gap-4">
                            {/* Multiple Files Input */}
                            <div className="flex-1">
                              <input
                                type="file"
                                accept={`.${fromFormat}`}
                                onChange={handleFileSelection}
                                multiple
                                className="w-full p-3 text-gray-700 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors"
                              />
                              <p className="mt-1 text-sm text-gray-500">
                                Select multiple files at once
                              </p>
                            </div>

                            {/* Folder Input */}
                            <div className="flex-1">
                              <input
                                type="file"
                                accept={`.${fromFormat}`}
                                onChange={handleFolderSelection}
                                webkitdirectory="true"
                                directory="true"
                                multiple
                                className="w-full p-3 text-gray-700 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors"
                              />
                              <p className="mt-1 text-sm text-gray-500">
                                Select entire folder
                              </p>
                            </div>
                          </div>

                          {error && (
                            <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
                              {error}
                            </p>
                          )}

                          {/* Selected Files Count */}
                          {selectedFiles.length > 0 && (
                            <div className="text-sm text-gray-600">
                              {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
                            </div>
                          )}
                        </div>

                        {/* Selected File Info Section - Updated */}
                        {selectedFiles.length > 0 && (
                          <div className="mb-8 flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-6 flex-grow">
                              <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-sm text-gray-600 font-medium">
                                  {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                </svg>
                                <span className="text-sm text-gray-600">
                                  Total: {(selectedFiles.reduce((acc, file) => acc + file.size, 0) / 1024).toFixed(2)} KB
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                </svg>
                                <span className="text-sm text-gray-600">
                                  {fromFormat.toUpperCase()} → {toFormat.toUpperCase()}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => {
                                  setSelectedFiles([])
                                  setSelectedImage(null)
                                }}
                                className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                title="Clear all files"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>

                              <ConversionButton 
                                loading={loading}
                                fileCount={selectedFiles.length}
                                onClick={handleConversion}
                              />
                            </div>
                          </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Updated Sidebar */}
            {showSidebar && convertedFiles.length > 0 && (
              <aside className="fixed right-0 top-0 bottom-0 w-80 z-20 bg-gradient-to-b from-white/30 via-purple-50/20 to-pink-50/20 backdrop-blur-sm border-l border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out z-50" onClick={e => e.stopPropagation()}>
                <div className="h-full flex flex-col">
                  {/* Sidebar Header */}
                  <div className="p-4 border-b border-white/20 backdrop-blur-sm bg-white/20">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Converted Files
                      </h2>
                      <button 
                        onClick={() => setShowSidebar(false)}
                        className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {convertedFiles.length} file{convertedFiles.length !== 1 ? 's' : ''} converted
                    </p>
                  </div>

                  {/* Converted Files List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {convertedFiles.map(file => (
                      <ConvertedFile
                        key={file.id}
                        file={file}
                        onDelete={() => handleDeleteFile(file.id)}
                      />
                    ))}
                  </div>
                </div>
              </aside>
            )}

            {/* Preview Popup */}
            {previewImage && (
              <PreviewPopup
                image={previewImage}
                onClose={() => setPreviewImage(null)}
              />
            )}
        </div>
    )
}

// Update your CSS for smooth transitions
const styles = {
  mainContainer: `
    min-h-screen 
    bg-gradient-to-br 
    from-indigo-100 
    via-purple-100 
    to-pink-100
  `,
  mainContent: `
    min-h-screen 
    mx-auto 
    max-w-6xl 
    p-8
    transition-all 
    duration-300 
    ease-in-out
  `,
  sidebar: `
    fixed 
    right-0 
    top-0 
    bottom-0 
    w-80 
    bg-gradient-to-b 
    from-white/80 
    to-purple-50/80 
    backdrop-blur-md 
    border-l 
    border-white/20 
    p-6 
    transform 
    transition-transform 
    duration-300 
    ease-in-out 
    overflow-y-auto 
    shadow-xl
    z-40
  `
}
