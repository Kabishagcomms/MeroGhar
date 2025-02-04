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
    formState: { errors },
  } = useForm<SearchForm>({
    defaultValues: {
      country: '',
      state: '',
      city: '',
      propertyType: '',
      amenities: [''],
      minRate: 0,
      maxRate: 0,
      rating: 0,
    },
    mode: 'onChange',
  })

  const onSubmit = (formdata: SearchForm) => {
    try {
      const filteredAmenities = formdata.amenities.filter((item) => item !== '')
      const query = {
        ...formdata,
        amenities: filteredAmenities,
        country: formdata.country
          ? countryhook.getCountryData(Number.parseInt(formdata.country)).name
          : '',
        state: formdata.state
          ? countryhook.getStateData(
              Number.parseInt(formdata.country),
              Number.parseInt(formdata.state)
            ).name
          : '',
      }

      const url = qs.stringifyUrl(
        {
          url: '/Home',
          query,
        },
        { skipNull: true }
      )

      modal.onClose()
      router.push(url)
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Filter</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-1">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Price Range</h2>
                  <p className="text-sm text-muted-foreground">
                    Set your preferred nightly rate range
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="minRate">Minimum Rate/Night</Label>
                      <Input
                        id="minRate"
                        className="focus:border-[#59b077] focus:ring-0"
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
                      <Label htmlFor="maxRate">Maximum Rate/Night</Label>
                      <Input
                        id="maxRate"
                        type="number"
                        className="focus:border-[#59b077] focus:ring-0"
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

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Property Details</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select {...register('propertyType')}>
                        <SelectTrigger>
                          <SelectValue
                            className="focus:border-[#59b077] focus:ring-0"
                            placeholder="Select property type"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyOptions.map((type) => (
                            <SelectItem
                              className="focus:bg-[#66cd8b] focus:ring-0"
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
                      <Label htmlFor="rating">Minimum Rating</Label>
                      <Input
                        id="rating"
                        type="number"
                        placeholder="0"
                        className="focus:border-[#59b077] focus:ring-0"
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

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Location</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select {...register('country')}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country, index) => (
                            <SelectItem
                              key={country.name}
                              value={index.toString()}
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select {...register('state')}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
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
                      <Label htmlFor="city">City</Label>
                      <Select {...register('city')}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
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

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Amenities</h2>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {amenities.map((amenity, index) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`amenity-${index}`}
                          value={amenity}
                          className="data-[state=checked]:border-[#59b077] data-[state=checked]:bg-[#59b077]"
                          {...register(`amenities.${index}`)}
                        />
                        <Label htmlFor={`amenity-${index}`} className="text-sm">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="sticky bottom-0 flex items-center justify-between rounded-lg border bg-background p-4">
              <Button
                type="button"
                variant="ghost"
                className="hover:text-red-500"
                onClick={() => modal.onClose()}
              >
                Cancel
              </Button>
              <Button className="bg-[#59b077] hover:bg-[#66cd8b]" type="submit">
                Search
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
