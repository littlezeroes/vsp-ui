"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AutoPaymentRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/sbh/my-bills")
  }, [router])
  return null
}
