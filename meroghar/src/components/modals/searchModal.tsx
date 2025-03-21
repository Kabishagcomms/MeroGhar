'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import type { ICountry } from 'country-state-city'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'

import { propertyOptions, amenities } from '../../configs/constant'
import useModal from '../../store/useModal'
import useCountry from '../../store/useCountry'

export interface SearchForm {
  minRate: number
  maxRate: number
  propertyType: string
  country: string
  state: string
  city: string
  rating: number
  amenities: string[]
}

export function SearchModal() {
  const modal = useModal()
  const router = useRouter()
  const countryhook = useCountry()
  const [countries] = useState<ICountry[]>(countryhook.Countries)

  const {
    register,
    handleSubmit,
    watch,
    setValue, // Add this to destructure setValue from useForm
    formState: { errors },
  } = useForm<SearchForm>({
    defaultValues: {
      country: '',
      state: '',
      city: '',
      propertyType: '',
      amenities: [], // Change this to empty array instead of ['']
      minRate: 0,
      maxRate: 0,
      rating: 0,
    },
    mode: 'onChange',
  })

  const onSubmit = (formdata: SearchForm) => {
    try {
      // Create a clean query object
      let query: any = {}
      
      // Only add selected amenities
      if (formdata.amenities && formdata.amenities.length > 0) {
        query.amenities = formdata.amenities
      }
      
      if (formdata.country && formdata.country !== '') {
        query.country = countryhook.getCountryData(Number.parseInt(formdata.country)).name
      }
      
      if (formdata.state && formdata.state !== '') {
        query.state = countryhook.getStateData(
          Number.parseInt(formdata.country),
          Number.parseInt(formdata.state)
        ).name
      }
      
      if (formdata.city && formdata.city !== '') {
        query.city = formdata.city
      }
      
      if (formdata.propertyType && formdata.propertyType !== '') {
        query.propertyType = formdata.propertyType
      }
      
      // Only add rate parameters if they're greater than 0
      if (formdata.minRate > 0) {
        query.minRate = formdata.minRate
      }
      
      if (formdata.maxRate > 0) {
        query.maxRate = formdata.maxRate
      }
      
      if (formdata.rating > 0) {
        query.rating = formdata.rating
      }
      
      // If no search criteria were selected, just navigate to the listings page without query params
      const url = Object.keys(query).length > 0 
        ? qs.stringifyUrl(
            {
              url: '/Home/listings',
              query,
            },
            { skipNull: true, skipEmptyString: true }
          )
        : '/Home/listings';

      // Close the modal first, then navigate
      modal.onClose()
      
      // Add a loading state to the URL to indicate we're loading
      const urlWithLoading = url + (url.includes('?') ? '&loading=true' : '?loading=true');
      router.push(urlWithLoading)
    } catch (error) {
      console.error(error)
    }
  }

  if (modal.isOpen !== 'search') {
    return null
  }

  return (
    <Dialog
      open={modal.isOpen === 'search'}
      onOpenChange={() => modal.onClose()}
    >
      <DialogContent className="max-w-3xl bg-[var(--color-primary)] border-[var(--color-secondary)] rounded-xl">
        <DialogHeader className="border-b border-[var(--color-secondary)/20] pb-4">
          <DialogTitle className="text-2xl font-rubik text-[var(--color-secondary)] font-bold">Find Your Perfect Stay</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-3">
            <Card className="border-[var(--color-secondary)/20 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-rubik font-semibold text-[var(--color-secondary)]">Price Range</h2>
                  <p className="text-sm text-[var(--color-secondary)]/70 font-inter">
                    Set your preferred nightly rate range
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="minRate" className="font-medium text-[var(--color-secondary)]">Minimum Rate/Night</Label>
                      <Input
                        id="minRate"
                        className="bg-white/80 border-[var(--color-secondary)]/30 focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)]/50 rounded-md"
                        type="number"
                        placeholder="0"
                        {...register('minRate', {
                          min: { value: 0, message: 'Must be non-negative' },
                        })}
                      />
                      {errors.minRate && (
                        <p className="text-sm text-destructive">
                          {errors.minRate.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxRate" className="font-medium text-[var(--color-secondary)]">Maximum Rate/Night</Label>
                      <Input
                        id="maxRate"
                        type="number"
                        className="bg-white/80 border-[var(--color-secondary)]/30 focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)]/50 rounded-md"
                        placeholder="0"
                        {...register('maxRate', {
                          min: { value: 0, message: 'Must be non-negative' },
                        })}
                      />
                      {errors.maxRate && (
                        <p className="text-sm text-destructive">
                          {errors.maxRate.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[var(--color-secondary)]/20 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-rubik font-semibold text-[var(--color-secondary)]">Property Details</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyType" className="font-medium text-[var(--color-secondary)]">Property Type</Label>
                      <Select {...register('propertyType')}>
                        <SelectTrigger className="bg-white/80 border-[var(--color-secondary)]/30 focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)]/50 rounded-md">
                          <SelectValue
                            placeholder="Select property type"
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[var(--color-secondary)]/30">
                          {propertyOptions.map((type) => (
                            <SelectItem
                              className="focus:bg-[var(--color-secondary)]/10 hover:bg-[var(--color-secondary)]/5"
                              key={type}
                              value={type}
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rating" className="font-medium text-[var(--color-secondary)]">Minimum Rating</Label>
                      <Input
                        id="rating"
                        type="number"
                        placeholder="0"
                        className="bg-white/80 border-[var(--color-secondary)]/30 focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)]/50 rounded-md"
                        {...register('rating', {
                          min: { value: 0, message: 'Minimum 0' },
                          max: { value: 5, message: 'Maximum 5' },
                        })}
                      />
                      {errors.rating && (
                        <p className="text-sm text-destructive">
                          {errors.rating.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[var(--color-secondary)]/20 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-rubik font-semibold text-[var(--color-secondary)]">Location</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="country" className="font-medium text-[var(--color-secondary)]">Country</Label>
                      <Select {...register('country')}>
                        <SelectTrigger className="bg-white/80 border-[var(--color-secondary)]/30 focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)]/50 rounded-md">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[var(--color-secondary)]/30">
                          {countries.map((country, index) => (
                            <SelectItem
                              key={country.name}
                              value={index.toString()}
                              className="focus:bg-[var(--color-secondary)]/10 hover:bg-[var(--color-secondary)]/5"
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state" className="font-medium text-[var(--color-secondary)]">State</Label>
                      <Select {...register('state')}>
                        <SelectTrigger className="bg-white/80 border-[var(--color-secondary)]/30 focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)]/50 rounded-md">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[var(--color-secondary)]/30">
                          {countryhook
                            .getStates(Number.parseInt(watch('country')))
                            .map((state, index) => (
                              <SelectItem
                                key={state.name}
                                value={index.toString()}
                              >
                                {state.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="font-medium text-[var(--color-secondary)]">City</Label>
                      <Select {...register('city')}>
                        <SelectTrigger className="bg-white/80 border-[var(--color-secondary)]/30 focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)]/50 rounded-md">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[var(--color-secondary)]/30">
                          {countryhook
                            .getCities(
                              Number.parseInt(watch('country')),
                              Number.parseInt(watch('state'))
                            )
                            .map((city) => (
                              <SelectItem key={city.name} value={city.name}>
                                {city.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[var(--color-secondary)]/20 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-rubik font-semibold text-[var(--color-secondary)]">Amenities</h2>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2 hover:bg-[var(--color-secondary)]/5 p-2 rounded-md transition-colors"
                      >
                        <Checkbox
                          id={`amenity-${amenity}`}
                          value={amenity}
                          className="border-[var(--color-secondary)]/50 data-[state=checked]:border-[var(--color-secondary)] data-[state=checked]:bg-[var(--color-secondary)]"
                          onCheckedChange={(checked) => {
                            // Get current amenities
                            const currentAmenities = [...(watch('amenities') || [])];
                            
                            // Add or remove the amenity based on checkbox state
                            if (checked) {
                              setValue('amenities', [...currentAmenities, amenity]);
                            } else {
                              setValue('amenities', currentAmenities.filter(a => a !== amenity));
                            }
                          }}
                        />
                        <Label htmlFor={`amenity-${amenity}`} className="text-sm text-[var(--color-secondary)] cursor-pointer">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="sticky bottom-0 flex items-center justify-between rounded-lg border border-[var(--color-secondary)]/20 bg-[var(--color-primary)] p-4 shadow-md">
              <Button
                type="button"
                variant="outline"
                className="border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 hover:text-[var(--color-secondary)] transition-colors"
                onClick={() => modal.onClose()}
              >
                Cancel
              </Button>
              <Button 
                className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-white font-medium transition-colors" 
                type="submit"
              >
                Find Properties
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
