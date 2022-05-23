import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Hindi', code:'hi' },
  { name: 'Bengali', code:'bn' },
  { name: 'Marathi', code:'mr' },
  { name: 'Gujarati', code:'gu' },
  { name: 'Malayalam', code:'ml' },
  { name: 'Russian', code:'ru' },
  { name: 'Arabic', code:'ar' },
  { name: 'Chinese', code:'zh' },
  { name: 'French', code:'fr' },
  { name: 'German', code:'de' },
  { name: 'Irish', code:'ga' },
  { name: 'Japanese', code:'ja' },
  { name: 'Spanish', code:'es' },
  { name: 'Urdu', code:'ur' },
  { name: 'Tamil', code:'ta' },
]

export default function LanguageSelector({onLangChange}) {
  const [selected, setSelected] = useState(languages[0])

  return (
    <>
      <Listbox value={selected} onChange={(e) => {
        setSelected(e);
        onLangChange(e)
      }}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left drop-shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:bg-gray-900 dark:border dark:border-purple-500">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-900 dark:text-white dark:border dark:border-purple-500 z-20">
              {languages.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative select-none py-2 pl-10 pr-4 cursor-pointer ${
                      active ? 'bg-gradient-to-r from-blue-100 to-pink-100 text-amber-900 dark:text-white dark:hover:bg-slate-700 dark:hover:bg-gradient-to-t dark:from-transparent dark:to-transparent' : 'text-gray-900 dark:text-white'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  )
}
